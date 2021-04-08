//%runIf:  Data.Services.Exists(service => service.Groups[0].Name == "Git" && service.Name == "Git")

//%t:begin Intro
//%t:end Intro

//%s:begin Header



using System;
using LibGit2Sharp;
using Library.Application.Interfaces.ServiceInterfaces.GitServiceInterfaces;
using Library.Application.Interfaces.ServiceInterfaces.PathServiceInterfaces;



//%s:end Header


namespace Library.Infrastructure.Services.GitServices
{
    public /*%s:begin Partial*/ /*%s:end Partial*/ class GitService
        : /*%s:begin BaseClass*/ /*%s:end BaseClass*/
            IGitService
    {
        private readonly string _password = "";

        /*%s:begin Properties*/
        private readonly IPathService _pathService;
        private readonly Repository _repository;

        private readonly string _username = "tanekim77";
        /*%s:end Properties*/


        public GitService(
            /*%s:begin ConstructorParameters*/
            IPathService pathService
            /*%s:end ConstructorParameters*/
        )
        {
            /*%s:begin ConstructorBody*/
            _pathService = pathService;

            var appDir = _pathService.GetAppDirPath().AppDirPath;
            _repository = new Repository(path: appDir);
            /*%s:end ConstructorBody*/
        }


        //%s:begin Body
        private Signature GetSignature()
        {
            Configuration config = _repository.Config;
            Signature author = config.BuildSignature(now: DateTimeOffset.Now);
            return author;
            //return new Signature(_email, _username, DateTimeOffset.Now);
        }

        public Commit GetCommit(string commitString)
        {
            Commit commit = _repository.Lookup<Commit>(objectish: commitString);
            return commit;
        }

        public void StageChanges()
        {
        }

        public void CommitChanges()
        {
            var signature = GetSignature();

            _repository.Commit(message: "updating files..", author: signature, committer: signature);
        }

        public void PushChanges()
        {
            var remote = _repository.Network.Remotes[name: "origin"];
            var credentials = new UsernamePasswordCredentials {Username = _username, Password = _password};
            var options = new PushOptions
            {
                CredentialsProvider = (url, usernameFromUrl, types) => credentials
            };
            var pushRefSpec = @"refs/heads/master";
            _repository.Network.Push(remote: remote, pushRefSpec: "BRANC NAME", pushOptions: options);
        }


        //%s:end Body

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}