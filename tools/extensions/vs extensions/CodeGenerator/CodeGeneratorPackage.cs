﻿using CodeGenerator.Commands;
using CodeGenerator.Options;
using Microsoft.VisualStudio;
using Microsoft.VisualStudio.Shell;
using System;
using System.Runtime.InteropServices;
using System.Threading;
using static Microsoft.VisualStudio.VSConstants;
using Task = System.Threading.Tasks.Task;

namespace CodeGenerator
{
    /// <summary>
    /// This is the class that implements the package exposed by this assembly.
    /// </summary>
    /// <remarks>
    /// <para>
    /// The minimum requirement for a class to be considered a valid package for Visual Studio
    /// is to implement the IVsPackage interface and register itself with the shell.
    /// This package uses the helper classes defined inside the Managed Package Framework (MPF)
    /// to do it: it derives from the Package class that provides the implementation of the
    /// IVsPackage interface and uses the registration attributes defined in the framework to
    /// register itself and its components with the shell. These attributes tell the pkgdef creation
    /// utility what data to put into .pkgdef file.
    /// </para>
    /// <para>
    /// To get loaded into VS, the package must be referred by &lt;Asset Type="Microsoft.VisualStudio.VsPackage" ...&gt; in .vsixmanifest file.
    /// </para>
    /// </remarks>
    [PackageRegistration(UseManagedResourcesOnly = true, AllowsBackgroundLoading = true)]
    [Guid(PackageGuids.guidCodeGeneratorPackageString)]
    [ProvideMenuResource("Menus.ctmenu", 1)]
    [InstalledProductRegistration(Vsix.Name, Vsix.Description, Vsix.Version)]
    [ProvideOptionPage(typeof(DialogPageProvider.General), "My Options", "General", 0, 0, true, new[] { "Code Generator" }, ProvidesLocalizedCategoryName = false)]
    [ProvideProfile(typeof(DialogPageProvider.General), "My Options", Vsix.Name, 0, 0, true)]

    //[ProvideAutoLoad(UICONTEXT.SolutionExists_string, PackageAutoLoadFlags.BackgroundLoad)]

    [ProvideAutoLoad(PackageGuids.guidValidFileString, PackageAutoLoadFlags.BackgroundLoad)]
    [ProvideUIContextRule(PackageGuids.guidValidFileString,
        name: "Valid file",
        expression: "templateFile | isFolder | isVcProject | isFsharpProject | isCsharpProject | isVBProject | isSolution",
        termNames: new[] {
            "templateFile" ,
            "isFolder",
            "isVcProject",
            "isFsharpProject",
            "isCsharpProject",
            "isVBProject",
            "isSolution",
        },
        termValues: new[] {
            @"HierSingleSelectionName:_[tT]emp_(\.\w+)$",
            @"HierSingleSelectionName:[\\/]$" ,
            UICONTEXT.VCProject_string,
            UICONTEXT.FSharpProject_string,
            UICONTEXT.CSharpProject_string,
            UICONTEXT.VBProject_string,
            @"HierSingleSelectionName:^$" ,
        }
        )]
    public sealed class CodeGeneratorPackage : AsyncPackage
    {
        #region Package Members

        /// <summary>
        /// Initialization of the package; this method is called right after the package is sited, so this is the place
        /// where you can put all the initialization code that rely on services provided by VisualStudio.
        /// </summary>
        /// <param name="cancellationToken">A cancellation token to monitor for initialization cancellation, which can occur when VS is shutting down.</param>
        /// <param name="progress">A provider for progress updates.</param>
        /// <returns>A task representing the async work of package initialization, or an already completed task if there is none. Do not return null from this method.</returns>
        protected override async Task InitializeAsync(CancellationToken cancellationToken, IProgress<ServiceProgressData> progress)
        {
            // When initialized asynchronously, the current thread may be a background thread at this point.
            // Do any initialization that requires the UI thread after switching to the UI thread.
            await JoinableTaskFactory.SwitchToMainThreadAsync(cancellationToken);
            await GenerateCode.InitializeAsync(this);
        }

        #endregion
    }
}
