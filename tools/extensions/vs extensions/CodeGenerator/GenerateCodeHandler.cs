using Microsoft.VisualStudio.Commanding;
using Microsoft.VisualStudio.Text.Editor;
using Microsoft.VisualStudio.Text.Editor.Commanding;
using Microsoft.VisualStudio.Utilities;
using System;
using System.ComponentModel.Composition;

namespace CodeGenerator
{
    [Export(typeof(ICommandHandler))]
    [Name(nameof(GenerateCodeHandler))]
    [ContentType("code")]
    [TextViewRole(PredefinedTextViewRoles.PrimaryDocument)]
    public class GenerateCodeHandler : ICommandHandler<EditorCommandArgs> // Replace EditorCommandArgs with more specific CommandArgs class
    {
        public string DisplayName => nameof(GenerateCodeHandler);

        public bool ExecuteCommand(EditorCommandArgs args, CommandExecutionContext executionContext)
        {
            throw new NotImplementedException();
        }

        public CommandState GetCommandState(EditorCommandArgs args)
        {
            return CommandState.Available;
        }
    }
}