<!DOCTYPE HTML>
<html lang="en">
    <body>

    <link rel="stylesheet" href="css/style.css" />
    <div class="h-center v-center">
        <h1>music-db</h1>
        <h2>Registration</h2>
        <div>
            <form method="post" action="index.php">
                <label for="name">Username:</label>
                <input type="text" id="username1" name="name"><br>
                <label for="pwd">Password:</label>
                <input type="text" id="password" name="pwd"><br>
                <input class="button black-text-bg white-text" type="submit" value="Register" name="Register">
            </form>
        </div>
        <?php
            function Register(){
                $servername = "localhost";
                $username = "root";
                $password = "";
                $dbname = "music-db";
                $conn = new mysqli($servername, $username, $password, $dbname);

                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    if (empty($_POST["name"]) or empty($_POST["pwd"])){
                        echo "Name and password are required";
                    } 
                    else {
                        $usr = $_POST['name'];
                        $sql_query = "SELECT * FROM users WHERE username = ('$usr')";
                        $result = mysqli_query($conn, $sql_query);
                        if(mysqli_num_rows($result)!=0){
                            echo "User already exists";
                        }
                        else{
                            $name = str_replace("'","\'",$_POST["name"]);
                            $password = str_replace("'","\'",$_POST["pwd"]);
                            $sql = "INSERT INTO users (username, password) VALUES ('$name','$password')";
                            echo "User registered successfully";
                            mysqli_query($conn, $sql);
                        }
                    }
                }
                $conn->close();
            }
            if(isset($_POST['Register'])){
                Register();
            } 
        ?>

        <h2>Retrieve Songs By Username</h2>
        <div>
            <form method="post" action="index.php">
                <label for="name">Username:</label>
                <input type="text" id="user-ret" name="name"><br>
                <input class="button black-text-bg white-text" type="submit" value="Retrieve" name="retRating">
            </form>
        </div>
        <?php
            function retRatings(){
                $servername = "localhost";
                $dbusername = "root";
                $password = "";
                $dbname = "music-db";

                $conn = new mysqli($servername, $dbusername, $password, $dbname);

                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }

                $username = str_replace("'","\'",$_REQUEST['name']); //In case username contains an apostrophe
                if(!empty($username)){
                    $sql_query = "SELECT song, rating FROM ratings WHERE username = ('$username')";
                    $result = mysqli_query($conn, $sql_query);
                    if(mysqli_num_rows($result)!=0){
                        //Each subsequent call to mysqli_fetch_array will return the next row within the result set, or null if there are no more rows.
                        while ($row = mysqli_fetch_array($result)) {
                            printf($row['song']." -> ".$row['rating']);
                            echo "<br>";
                        }
                    }else{
                        $sql_query = "SELECT * FROM users WHERE username = ('$username')";
                        $result = mysqli_query($conn, $sql_query);
                        if(mysqli_num_rows($result)!=0){
                            echo "User does not have a review.";
                        }
                        else{
                            echo "User does not exist.";
                        }
                    }
                }
                else{
                    echo "Must provide a username";
                }
                $conn->close();
            }

            if(isset($_POST['retRating'])){
                retRatings();
            } 
        ?>

    </div>
    </body>

</html>