namespace SharedLibrary.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces
{
    public interface ISharedXmlSerializerService
    {
        ReadObjectFromFileOutput<T> ReadObjectFromFile<T>(string fileName);

        ReadObjectFromStringOutput<T> ReadObjectFromString<T>(string xmlText);
        void WriteObjectToFile(string fileName, object obj);

        WriteObjectToStringOutput WriteObjectToString(object obj);

        public record ReadObjectFromFileOutput<T>
        {
            public T Payload { get; init; }
        }

        public record ReadObjectFromStringOutput<T>
        {
            public T Payload { get; init; }
        }

        public record WriteObjectToStringOutput
        {
            public string Payload { get; init; }
        }
    }
}