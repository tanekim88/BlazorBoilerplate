/*%runIf: 
Data.Services.Exists(service => service.Groups[0].Name == "Serializer" && service.Name == "XmlSerializer")
*/

//%t:begin Intro


//%t:end Intro

//%s:begin Header



using System;
using System.IO;
using System.Runtime.Serialization;
using System.Xml;
using System.Xml.Serialization;
using SharedLibrary.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces;
using static SharedLibrary.Application.Interfaces.ServiceInterfaces.SerializerServiceInterfaces.ISharedXmlSerializerService;



//%s:end Header

//%t:begin Header
//%t:end Header


namespace SharedLibrary.Infrastructure.Services.SerializerServices
{
    //%s:begin Attributes
    //%s:end Attributes
    public class SharedXmlSerializerService :
        /*%s:begin BaseClass*/ /*%s:end BaseClass*/
        ISharedXmlSerializerService
    {
        //%s:begin Properties
        //%s:end Properties


        //%s:begin Body

        public WriteObjectToStringOutput WriteObjectToString(object obj)
        {
            using (var stringwriter = new StringWriter())
            {
                var serializer = new XmlSerializer(type: obj.GetType());
                serializer.Serialize(textWriter: stringwriter, o: obj);
                return new WriteObjectToStringOutput {Payload = stringwriter.ToString()};
            }
        }


        public ReadObjectFromStringOutput<T> ReadObjectFromString<T>(string xmlText)
        {
            using (var stringReader = new StringReader(s: xmlText))
            {
                var serializer = new XmlSerializer(type: typeof(T));
                return new ReadObjectFromStringOutput<T>
                    {Payload = (T) serializer.Deserialize(textReader: stringReader)};
            }
        }


        public void WriteObjectToFile(
            string fileName,
            object obj
        )
        {
            FileStream writer = new(path: fileName, mode: FileMode.Create);
            DataContractSerializer ser =
                new(type: obj.GetType());
            ser.WriteObject(stream: writer, graph: obj);
            writer.Close();
        }


        public ReadObjectFromFileOutput<T> ReadObjectFromFile<T>(string fileName)
        {
            Console.WriteLine(value: "Deserializing an instance of the object.");
            FileStream fs = new(path: fileName,
                mode: FileMode.Open);

            XmlDictionaryReader reader =
                XmlDictionaryReader.CreateTextReader(stream: fs, quotas: new XmlDictionaryReaderQuotas());
            DataContractSerializer ser = new(type: typeof(T));

            var deserializedObj =
                (T) ser.ReadObject(reader: reader, verifyObjectName: true);

            reader.Close();
            fs.Close();

            return new ReadObjectFromFileOutput<T> {Payload = deserializedObj};
        }

        //%s:end Body
    }
}