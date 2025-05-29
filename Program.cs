using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    AddStartBooks(database);

    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/418.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
       
        if (request.Path == "logIn")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var user = database.Users.First(
              user => user.Username == username && user.Password == password
            );

            var userId = user.Id;

            response.Send(userId);
          }
          else if (request.Path == "getUsername")
          {
            var userId = request.GetBody<string>();

            var username = database.Users.Find(userId)?.Username;

            response.Send(username);
          }
          else if (request.Path == "getArtist")
          {
            var books = database.Artists.ToArray();

            response.Send(books);
          }
          else if (request.Path == "addArtist")
          {
            var (artistName, date, imageSource, description, price) =
              request.GetBody<(string, string, string, string, int?)>();

            var artist = new Artist(artistName, date, imageSource, description, price);

            database.Artists.Add(artist);
          }
          else if (request.Path == "getArtistInfo")
          {
            var (userId, ArtistId) = request.GetBody<(string?, int)>();

            var artist = database.Artists
              .First(artist => artist.Id == ArtistId)!;

            response.Send(artist);
          }
         else if (request.Path == "addArtical")
          {
            var (artist_name, artistURL, videoURL) = request.GetBody<(string, string,string)>();

            var artical= new Artical(artist_name,artistURL,videoURL);

            database.Articals.Add(artical);
          }


          response.SetStatusCode(405);

          database.SaveChanges();


        }

        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }

      response.Close();
    }
  }
  static void AddStartBooks(Database database)
  {
    if (database.IsNewlyCreated())
    {
      var startUser = new User("admin", "admin", "");

      database.Users.Add(startUser);

      database.SaveChanges();

      var startBooks = new Artist[] {
        new Artist(
        "Mikhail Volkov",
        "23.02.2024",
        "https://i.ytimg.com/vi/z49b6zheLIY/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDYcdOKYYDGXJwLIOPVLQVGaoAgpg",
        "asya nomer odin",
        70
        ),
        new Artist(
          "Mikhail Feldman",
          "15.11.2024",
          "https://i.ytimg.com/vi/emuwEdrcBUA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYZq41ayKX66dymXgNZ77qmVQigw",
          "aaa ijkljnilb",
          70
        ),
       
      };

      for (int i = 0; i < startBooks.Length; i++)
      {
        database.Artists.Add(startBooks[i]);
      }

      database.SaveChanges();
    }
  }
}




class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Artist> Artists { get; set; } = default!;
  public DbSet<Artical> Articals { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Artist(
  string artistName,
  string date,
  string imageSource,
  string description,
  int? price
)
{
  [Key] public int Id { get; set; } = default!;
  public string ArtistName { get; set; } = artistName;
  public string Date { get; set; } = date;
  public string ImageSource { get; set; } = imageSource;
  public string Description { get; set; } = description;
  public int? Price { get; set; } = price;
}

class Artical(
  string artist_name,
  string infoURL,
  string videoURL
)
{
  [Key] public int Id { get; set; } = default!;
  public string Artist_name { get; set; } = artist_name;
  public string InfoURL { get; set; } = infoURL;
  public string VideoURL { get; set; } = videoURL;
}
