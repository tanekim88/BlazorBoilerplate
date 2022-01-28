

using System.Collections;
using System.Collections.Generic;
using System.Linq;



namespace CodeGenerator.Utilities
{
    public class CombinatorOfLists<T> : IEnumerable<List<T>>
    {
        private readonly List<List<T>> _args;

        public CombinatorOfLists(List<List<T>> args)
        {
            _args = args;
        }

        public IEnumerator<List<T>> GetEnumerator()
        {
            var startIndex = 0;
            var endIndex = _args.Count() - 1;
            var current = _args.Select(selector: s => 0).ToList();
            var end = _args.Select(selector: s => s.Count() - 1).ToList();

            while (current != null)
            {
                yield return current.Select(selector: (x, index) => _args[index: index][index: x]).ToList();

                current = GetNext(current: current, end: end);
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }


        public List<int> GetNext(List<int> current, List<int> end)
        {
            if (current.SequenceEqual(second: end)) return null;

            for (var i = 0; i < current.Count(); i++)
                if (current[index: i] == end[index: i])
                {
                    current[index: i] = 0;
                }
                else
                {
                    current[index: i]++;
                    break;
                }

            return current;
        }
    }
}