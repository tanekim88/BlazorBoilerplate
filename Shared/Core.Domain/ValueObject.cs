

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Core.Domain.Exceptions;
using Core.Domain.Interfaces;



namespace Core.Domain
{
    public abstract class ValueObject : IEquatable<ValueObject>
    {
        private List<FieldInfo> _fields;
        private List<PropertyInfo> _properties;

        public bool Equals(ValueObject obj)
        {
            return Equals(obj: obj as object);
        }

        public static bool operator ==(ValueObject obj1, ValueObject obj2)
        {
            if (Equals(objA: obj1, objB: null))
            {
                if (Equals(objA: obj2, objB: null)) return true;

                return false;
            }

            return obj1.Equals(obj: obj2);
        }

        public static bool operator !=(ValueObject obj1, ValueObject obj2)
        {
            return !(obj1 == obj2);
        }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType()) return false;

            return GetProperties().All(predicate: p => PropertiesAreEqual(obj: obj, p: p))
                   && GetFields().All(predicate: f => FieldsAreEqual(obj: obj, f: f));
        }

        public override int GetHashCode()
        {
            unchecked
            {
                var hash = 17;
                foreach (var prop in GetProperties())
                {
                    var value = prop.GetValue(obj: this, index: null);
                    hash = HashValue(seed: hash, value: value);
                }

                foreach (var field in GetFields())
                {
                    var value = field.GetValue(obj: this);
                    hash = HashValue(seed: hash, value: value);
                }

                return hash;
            }
        }

        protected static void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken()) throw new BusinessRuleValidationException(brokenRule: rule);
        }

        private bool PropertiesAreEqual(object obj, PropertyInfo p)
        {
            return Equals(objA: p.GetValue(obj: this, index: null), objB: p.GetValue(obj: obj, index: null));
        }

        private bool FieldsAreEqual(object obj, FieldInfo f)
        {
            return Equals(objA: f.GetValue(obj: this), objB: f.GetValue(obj: obj));
        }

        private IEnumerable<PropertyInfo> GetProperties()
        {
            if (_properties == null)
                _properties = GetType()
                    .GetProperties(bindingAttr: BindingFlags.Instance | BindingFlags.Public)
                    //.Where(p => p.GetCustomAttribute(typeof(IgnoreMemberAttribute)) == null)
                    .ToList();

            // Not available in Core
            // !Attribute.IsDefined(p, typeof(IgnoreMemberAttribute))).ToList();

            return _properties;
        }

        private IEnumerable<FieldInfo> GetFields()
        {
            if (_fields == null)
                _fields = GetType()
                    .GetFields(bindingAttr: BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
                    //.Where(p => p.GetCustomAttribute(typeof(IgnoreMemberAttribute)) == null)
                    .ToList();

            return _fields;
        }

        private int HashValue(int seed, object value)
        {
            var currentHash = value?.GetHashCode() ?? 0;

            return seed * 23 + currentHash;
        }
    }
}