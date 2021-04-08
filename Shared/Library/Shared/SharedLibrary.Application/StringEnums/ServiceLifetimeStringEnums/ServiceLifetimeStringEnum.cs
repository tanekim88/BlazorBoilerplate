namespace SharedLibrary.Application.StringEnums.ServiceLifetimeStringEnums
{
    public static class ServiceLifetimeStringEnum
    {
        public const string Singleton = nameof(Singleton);
        public const string Transient = nameof(Transient);
        public const string Scoped = nameof(Scoped);
    }
}