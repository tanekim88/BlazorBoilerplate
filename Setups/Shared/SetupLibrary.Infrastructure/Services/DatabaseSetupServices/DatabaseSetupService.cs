namespace SetupLibrary.Infrastructure.Services.DatabaseSetupServices
{
    public class DatabaseSetupService
    {
        //private GeoTargetsDatabaseSetupService _geoTargetsSetupService;
        private readonly ReferencesDatabaseSetupService _referencesSetupService;

        public DatabaseSetupService(
            //GeoTargetsDatabaseSetupService geoTargetsSetupService,
            ReferencesDatabaseSetupService referencesSetupService)
        {
            //_geoTargetsSetupService = geoTargetsSetupService;
            _referencesSetupService = referencesSetupService;
        }

        public void EnsureSeedData()
        {
            //_geoTargetsSetupService.EnsureSeedData();
            _referencesSetupService.EnsureSeedData();
        }
    }
}