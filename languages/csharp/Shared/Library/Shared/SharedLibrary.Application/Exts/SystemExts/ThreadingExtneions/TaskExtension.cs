using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLibrary.Application.Extensions.SystemExtensions.ThreadingExtensions
{
    public class TaskExtension
    {
        public static async Task<IEnumerable<T>> WhenAll2<T>(params Task<T>[] tasks)
        {
            var allTasks = Task.WhenAll(tasks);

            try
            {
                return await allTasks;
            }
            catch (Exception) { 
            //ignore
            }

            throw allTasks.Exception ?? throw new Exception("In case first one does not happen");
        }
    }
}
