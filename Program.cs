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
    // var articalToDelete = database.Users.Find(2);
    // database.Users.Remove(articalToDelete);
    // database.SaveChanges();
    AddStartBooks(database);
    AddStartArticals(database);

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

            var answer = database.Users.FirstOrDefault(
      userFound => userFound.Username == username && userFound.Password == password
  );

            var userId = answer?.Id;

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
            var (artist_name, artistURL, videoURL) = request.GetBody<(string, string, string)>();

            var artical = new Artical(artist_name, artistURL, videoURL);

            database.Articals.Add(artical);
          }
          else if (request.Path == "getArticalInfo")
          {

            var articals = database.Articals.ToArray();

            response.Send(articals);
          }
          else if (request.Path == "signUp")
          {
            var (username, password) = request.GetBody<(string, string)>();

            var userExists = database.Users.Any(user =>
              user.Username == username
            );

            if (!userExists)
            {
              var userId = Guid.NewGuid().ToString();
              database.Users.Add(new User(userId, username, password));
              response.Send(userId);
            }
          }
          else if (request.Path == "verifyUserId")
          {
            var userId = request.GetBody<string>();

            var varified = database.Users.Any(user => user.Id == userId);

            response.Send(varified);
          }
          else if (request.Path == "getArtistNames")
          {

            var artistname = database.Artists.ToArray();

            response.Send(artistname);
          }
          else if (request.Path == "makeAnOrder")
          {
            var (userId, selectedArtist, quantity) = request.GetBody<(string, int, int)>();

            var order = new Order(userId,selectedArtist,  quantity);

            database.Orders.Add(order);
          }
          // else if (request.Path == "removeOrder")
          // {
          //   var (userId, bookId) = request.GetBody<(string, int)>();

          //   var favorite = database.Favorites.First(
          //     favorite => favorite.UserId == userId && favorite.BookId == bookId
          //   );

          //   database.Favorites.Remove(favorite);
          // }
           else if (request.Path == "getAnOrder")
          {
            var userId = request.GetBody<string>();

            var myOrder = database.Orders.Where(or => or.UserId == userId).ToArray();
            Console.WriteLine(myOrder);
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
          "https://new.antho.net/wp/wp-content/uploads/2019/08/%D0%9C%D0%B8%D1%88%D0%B0-%D0%A4%D0%B5%D0%BB%D1%8C%D0%B4%D0%BC%D0%B0%D0%BD.jpg",
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
  static void AddStartArticals(Database database)
  {
    if (database.IsNewlyCreated())
    {
      var startArticals = new Artical[] {
        new Artical(
          "Михаил Фельдман",
          "https://did.li/i7Rrl",
          "https://www.youtube.com/watch?v=emuwEdrcBUA"
        ),
        new Artical(
          "Михаил Волков",
          "https://did.li/weBgT",
          "https://www.youtube.com/watch?v=QGgZYWl_dMo"
        ),
        new Artical(
          "Александр Дов",
          "https://did.li/Np4TY",
          "https://www.youtube.com/watch?v=sUzbqcRCZ6E"
        ),
        new Artical(
          "Эли Бар-Яалом",
          "https://did.li/akk6q",
          "https://www.youtube.com/watch?v=OqFQIDFFGLY"
        ),
        new Artical(
          "Ариэла Марина Меламед",
          "https://did.li/Op4TY",
          "https://www.youtube.com/watch?v=cUbuh1GQn28"
        ),
        new Artical(
          "Кимельфельд",
          "https://did.li/DXpOf",
          "https://www.youtube.com/watch?v=68FFjsz9ypw"
        ),
        new Artical(
          "Светлана и Александр Менделевы",
          "https://did.li/h49CN",
          "https://www.youtube.com/watch?v=fwITedTbR9o"
        ),
     };
        for (int i = 0; i < startArticals.Length; i++)
      {
        database.Articals.Add(startArticals[i]);
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
    public DbSet<Order> Orders { get; set; } = default!;
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
class Order(string userId, int artistId, int tickNum)
{
  [Key] public int Id { get; set; } = default!;

  public string UserId { get; set; } = userId;
  [ForeignKey("UserId")] public User User { get; set; } = default!;

  public int ArtistId { get; set; } = artistId;
  [ForeignKey("ArtistId")] public Artist artist { get; set; } = default!;
  public int TickNum{ get; set; } = tickNum;
}