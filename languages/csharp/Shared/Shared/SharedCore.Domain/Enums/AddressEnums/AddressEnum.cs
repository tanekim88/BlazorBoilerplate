

using SharedLibrary.Application.TypeConverters;
using System.ComponentModel;



namespace SharedCore.Domain.Enums.AddressEnums
{
    [TypeConverter(type: typeof(DescriptionEnumConverter))]
    public enum AddressEnum
    {
        None,
        Airport,
        AutonomousCommunity,
        Borough,
        Canton,
        City,
        CityRegion,
        CongressionalDistrict,
        Country,
        County,
        Department,
        District,
        Governorate,
        Municipality,
        NationalPark,
        Neighborhood,
        Okrug,
        PostalCode,
        Prefecture,
        Province,
        Region,
        State,
        Territory,
        TvRegion,
        UnionTerritory,
        University
    }
}