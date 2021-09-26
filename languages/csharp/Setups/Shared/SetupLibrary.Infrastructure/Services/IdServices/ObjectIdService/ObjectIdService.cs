

using System;
using System.Runtime.Serialization;



namespace SetupLibrary.Infrastructure.Services.IdServices
{
    public static class ObjectIdService
    {
        private static readonly ObjectIDGenerator gen = new();
        private static readonly string l = "";

        public static string GetId(object obj)
        {
            if (obj.GetType().IsValueType) throw new Exception(message: "VVV");

            lock (l)
            {
                return gen.GetId(obj: obj, firstTime: out var firstTime).ToString();
            }
        }
    }
}