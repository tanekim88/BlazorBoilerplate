using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain
{
    public abstract class TypedIdValueBase<TId> : IEquatable<TId> where TId : TypedIdValueBase<TId>
    {
        public int Id { get; }

        protected TypedIdValueBase(int? id = null)
        {
            //if (value == -1)
            //{
            //    throw new InvalidOperationException("Id value cannot be empty!");
            //}

            if (id is null) {
                id = 0;
            }

            Id = id.Value;
        }


        public class StronglyTypedIdEfValueConverter : ValueConverter<TId, int>
        {
            public StronglyTypedIdEfValueConverter(ConverterMappingHints mappingHints = null)
                : base(id => id.Id, value => (TId)Activator.CreateInstance(typeof(TId), new[] { value }), mappingHints)
            {
    //            ValueConverter<TId, int> converter = new ValueConverter<TId, int>
    //(v => v.Value, v => (TId)Activator.CreateInstance(typeof(TId), new[] { v }),
    //new ConverterMappingHints(valueGeneratorFactory: (p, t) => new TemporaryTypedIdValueGenerator<TId>()));
            }
        }


        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }

            return obj is TId other && Equals(other);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public bool Equals(TId other)
        {
            return this.Id == other?.Id;
        }

        public static bool operator ==(TypedIdValueBase<TId> obj1, TypedIdValueBase<TId> obj2)
        {
            if (object.Equals(obj1, null))
            {
                if (object.Equals(obj2, null))
                {
                    return true;
                }

                return false;
            }

            return obj1.Equals(obj2);
        }

        public static bool operator !=(TypedIdValueBase<TId> x, TypedIdValueBase<TId> y)
        {
            return !(x == y);
        }


        public override string ToString()
        {
            return Id.ToString();
        }
    }
}
