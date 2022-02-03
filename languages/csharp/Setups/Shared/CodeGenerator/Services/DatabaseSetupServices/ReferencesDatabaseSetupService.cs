namespace CodeGenerator.Services.DatabaseSetupServices
{
    public class ReferencesDatabaseSetupService
    {
        public ReferencesDatabaseSetupService()
        {
         
        }

        public void EnsureSeedData()
        {
            //using var context = _contextFactory.CreateDbContext();
            //context.Database.EnsureCreated();

            //var references = context.EnumReferences.ToList();

            //context.EnumReferences.RemoveRange(entities: references);

            //context.SaveChanges();

            //var enumTypes = new List<Type>();
            //var allTypes = AppDomain.CurrentDomain.GetAssemblies()
            //    .SelectMany(selector: assembly => assembly.GetTypes());

            //foreach (var type in allTypes)
            //    if (type.Namespace == "SharedLibrary.Enums" && type.IsEnum)
            //        enumTypes.Add(item: type);

            //foreach (var type in enumTypes)
            //{
            //    var values = Enum.GetValues(enumType: type);
            //    foreach (var value in values)
            //    {
            //        var reference = new EnumReference();
            //        reference.Type = type.Name;
            //        reference.Value = Convert.ToInt32(value: value);
            //        reference.Description = value.ToString();

            //        context.EnumReferences.Add(entity: reference);
            //    }
            //}

            //context.SaveChanges();
        }
    }
}