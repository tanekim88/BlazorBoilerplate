

using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace Auth.Server.Helpers
{
    public static class AsyncEnumerableExtensions
    {
        public static Task<List<T>> ToListAsync<T>(this IAsyncEnumerable<T> source)
        {
            if (source == null) throw new ArgumentNullException(paramName: nameof(source));

            return ExecuteAsync();

            async Task<List<T>> ExecuteAsync()
            {
                var list = new List<T>();

                await foreach (var element in source) list.Add(item: element);

                return list;
            }
        }
    }
}