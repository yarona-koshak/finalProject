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
            if (request.Path == "addArtist")
          {
            var (Artistname, date, imageSource, description, price) =
              request.GetBody<(string, string, string, string, int)>();

            var artist = new Performens(Artistname, date, imageSource, description, price);

            database.Artists.Add(artist);
          }
          else{
              response.SetStatusCode(405);
          }
        

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
}


class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<Performens> Artists = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}
class Performens( string Artistname,
  string date,
  string imageSource,
  string description,
  int price)
{
  [Key] public int Id { get; set; } = default!;
  public string Artistname { get; set; } = Artistname;
  public string date { get; set; } = date;
  public string ImageSource { get; set; } = imageSource;
  public string Description { get; set; } = description;
  public int price { get; set; } = price;
}
