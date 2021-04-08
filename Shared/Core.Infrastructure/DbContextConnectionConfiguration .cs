

using System;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;



namespace Core.Infrastructure
{
    public class DbContextConnectionConfiguration : IDisposable
    {
        private readonly Action<DbConnection, DbContextOptionsBuilder> _configuration;
        private readonly DbConnection _dbConnection;
        private readonly bool _dispose;

        public DbContextConnectionConfiguration(DbConnection dbConnection,
            Action<DbConnection, DbContextOptionsBuilder> configuration, bool dispose = true)
        {
            _dbConnection = dbConnection;
            _configuration = configuration;
            _dispose = dispose;
        }

        public void Dispose()
        {
            if (_dispose) _dbConnection.Dispose();
        }

        public void Configure(DbContextOptionsBuilder optionsBuilder)
        {
            _configuration(arg1: _dbConnection, arg2: optionsBuilder);
        }
    }
}