using CodeGenerator.Helpers;
using EnvDTE;
using EnvDTE80;
using Microsoft;
using Microsoft.VisualStudio.Shell;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Task = System.Threading.Tasks.Task;

namespace CodeGenerator.Commands
{
    /// <summary>
    /// Command handler
    /// </summary>
    internal sealed class GenerateCode
    {
        ///// <summary>
        ///// Command ID.
        ///// </summary>
        //public const int CommandId = 4129;

        ///// <summary>
        ///// Command menu group (command set GUID).
        ///// </summary>
        //public static readonly Guid CommandSet = new Guid("e7169fde-0aa9-40ce-95f1-4032a20c03da");

        /// <summary>
        /// VS Package that provides this command, not null.
        /// </summary>
        private readonly AsyncPackage package;

        /// <summary>
        /// Initializes a new instance of the <see cref="GenerateCode"/> class.
        /// Adds our command handlers for menu (commands must exist in the command table file)
        /// </summary>
        /// <param name="package">Owner package, not null.</param>
        /// <param name="commandService">Command service to add command to, not null.</param>
        private GenerateCode(AsyncPackage package, OleMenuCommandService commandService)
        {
            this.package = package ?? throw new ArgumentNullException(nameof(package));
            commandService = commandService ?? throw new ArgumentNullException(nameof(commandService));
            Assumes.Present(commandService);

            DTE2 dte = package.GetService<DTE, DTE2>();

            var menuCommandID = new CommandID(PackageGuids.guidCodeGeneratorPackageCmdSet, PackageIds.GenerateCodeId);
            var menuItem = new OleMenuCommand((s, e) => Execute(s, e, dte), menuCommandID, false);
            //menuItem.BeforeQueryStatus += (s, e) => MenuItem_BeforeQueryStatus(s, e, dte, menuItem);

            commandService.AddCommand(menuItem);
        }

        //private void MenuItem_BeforeQueryStatus(object sender, EventArgs e, DTE2 dte, OleMenuCommand cmd)
        //{
        //    var item = dte.SelectedItems.Item(1).ProjectItem;
        //    var proj = item.ContainingProject;
        //    cmd.Visible = Regex.IsMatch(item.FileNames[1], @"_(Tt)emp_(\.\w+)?$");


        //}

        /// <summary>
        /// Gets the instance of the command.
        /// </summary>
        public static GenerateCode Instance
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the service provider from the owner package.
        /// </summary>
        private Microsoft.VisualStudio.Shell.IAsyncServiceProvider ServiceProvider
        {
            get
            {
                return this.package;
            }
        }

        /// <summary>
        /// Initializes the singleton instance of the command.
        /// </summary>
        /// <param name="package">Owner package, not null.</param>
        public static async Task InitializeAsync(AsyncPackage package)
        {
            // Switch to the main thread - the call to AddCommand in GenerateCode's constructor requires
            // the UI thread.
            await ThreadHelper.JoinableTaskFactory.SwitchToMainThreadAsync(package.DisposalToken);

            OleMenuCommandService commandService = await package.GetServiceAsync<IMenuCommandService, OleMenuCommandService>();
            Instance = new GenerateCode(package, commandService);
        }

        /// <summary>
        /// This function is the callback used to execute the command when the menu item is clicked.
        /// See the constructor to see how the menu item is associated with this function using
        /// OleMenuCommandService service and MenuCommand class.
        /// </summary>
        /// <param name="sender">Event sender.</param>
        /// <param name="e">Event args.</param>
        private void Execute(object sender, EventArgs e, DTE2 dte)
        {
            ThreadHelper.ThrowIfNotOnUIThread();

            //    var item = dte.SelectedItems.Item(1).ProjectItem;
            //    var proj = item.ContainingProject;
            //    cmd.Visible = Regex.IsMatch(item.FileNames[1], @"_(Tt)emp_(\.\w+)?$");
            var t4codegenrcFileName = "codegen-config";
            var selectedPath = PathHelper.GetSelectedPath(dte, true);

            var currentDirPath = selectedPath;

            if (File.Exists(selectedPath))
            {
                currentDirPath = Directory.GetParent(selectedPath).FullName;
            }
            var configResult = GetAncestorFolderThatContainsThisFilePattern(new GetAncestorFolderThatContainsThisFileInput
            {
                CurrentDirPath = currentDirPath,
                RegexPathPatterns = new List<string> { $@"{Regex.Escape(Path.DirectorySeparatorChar.ToString())}{Regex.Escape(t4codegenrcFileName)}(\.json|\.js|\.ts)$" }
            });

            var configDirPath = configResult.FoundDirPath;
            var configPath = configResult.FoundPaths.FirstOrDefault();

            if (configPath != null)
            {
                string projectName = null;
                string prefixName = null;


                using (StreamReader file = File.OpenText(configPath))
                using (JsonTextReader reader = new JsonTextReader(file))
                {
                    JObject obj = (JObject)JToken.ReadFrom(reader);

                    var dotnetProjectDirPath = (string)obj["path"];

                    if (dotnetProjectDirPath == null)
                    {
                        throw new Exception("path is required.");
                    }

                    if (!Path.IsPathRooted(dotnetProjectDirPath))
                    {
                        dotnetProjectDirPath = Path.Combine(configDirPath, dotnetProjectDirPath);
                        dotnetProjectDirPath = Path.GetFullPath(dotnetProjectDirPath);
                    }

                    runCommand("dotnet", "build", (object sendingProcess, DataReceivedEventArgs outLine) =>
                    {

                    }, null, dotnetProjectDirPath);

                    runCommand("dotnet", $@"run -- -g -f ""{selectedPath}""", (object sendingProcess2, DataReceivedEventArgs outLine2) =>
                    {
                        //Console.WriteLine(outLine2.Data);
                    }, null, dotnetProjectDirPath);
                }
            }


            //string message = string.Format(CultureInfo.CurrentCulture, "Inside {0}.MenuItemCallback()", this.GetType().FullName);
            //string title = "GenerateCode";

            //// Show a message box to prove we were here
            //VsShellUtilities.ShowMessageBox(
            //    this.package,
            //    message,
            //    title,
            //    OLEMSGICON.OLEMSGICON_INFO,
            //    OLEMSGBUTTON.OLEMSGBUTTON_OK,
            //    OLEMSGDEFBUTTON.OLEMSGDEFBUTTON_FIRST);
        }

        static void runCommand(
            string executingPath,
            string arguments,
            Action<object, DataReceivedEventArgs> outputHandler = null,
            Action<object, DataReceivedEventArgs> errorHandler = null,
            string workingDirPath = null)
        {
            //* Create your Process
            System.Diagnostics.Process process = new System.Diagnostics.Process();
            process.StartInfo.FileName = executingPath;
            process.StartInfo.Arguments = arguments;
            process.StartInfo.WorkingDirectory = workingDirPath;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.CreateNoWindow = true;
            //* Set your output and error (asynchronous) handlers
            if (outputHandler != null)
            {
                process.OutputDataReceived += new DataReceivedEventHandler(outputHandler);
            }
            if (errorHandler != null)
            {
                process.ErrorDataReceived += new DataReceivedEventHandler(errorHandler);
            }

            //* Start process and handlers
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            process.WaitForExit();
        }

        public class GetAncestorFolderThatContainsThisFileInput
        {
            public string CurrentDirPath { get; set; }
            public List<string> RegexPathPatterns { get; set; }
        }

        public class GetAncestorFolderThatContainsThisFileOutput
        {
            public string FoundDirPath { get; set; }
            public List<string> FoundPaths { get; set; }
        }

        public GetAncestorFolderThatContainsThisFileOutput GetAncestorFolderThatContainsThisFilePattern(GetAncestorFolderThatContainsThisFileInput input)
        {
            var regexPathPatterns = input.RegexPathPatterns;
            var currentDirectory = input.CurrentDirPath;

            if (!Directory.Exists(currentDirectory))
            {
                return new GetAncestorFolderThatContainsThisFileOutput { FoundDirPath = null, FoundPaths = null };
            }

            var files = Directory.EnumerateFiles(currentDirectory, "*", SearchOption.TopDirectoryOnly).Where(filePath => regexPathPatterns.Any(r => Regex.IsMatch(filePath, r))).ToList();

            if (files.Count() > 0)
            {
                return new GetAncestorFolderThatContainsThisFileOutput { FoundDirPath = currentDirectory, FoundPaths = files.ToList() };
            }

            var parent = Directory.GetParent(currentDirectory);

            if (parent == null)
            {
                throw new Exception("codegen-config.json is required under the project.");
            }

            return GetAncestorFolderThatContainsThisFilePattern(
                new GetAncestorFolderThatContainsThisFileInput
                {
                    CurrentDirPath = Directory.GetParent(currentDirectory).FullName,
                    RegexPathPatterns = regexPathPatterns
                }
            );
        }
    }
}
