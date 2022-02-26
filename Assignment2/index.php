<!DOCTYPE HTML>
<html lang="en">
    <body>

    <link rel="stylesheet" href="css/style.css" />
    <div class="h-center v-center">
        <h1>music-db</h1>
        <h2>Registration</h2>
        <div>
            <form>
                <label for="name">Username:</label>
                <input  type="text" id="username1" name="name"><br>
                <label for="p">Password:</label>
                <input type="text" id="password" name="p"><br>
                <input class="button black-text-bg white-text" type="submit" value="Register">
            </form>
        </div>
        <h2>Retrieve Songs By Username</h2>
        <div>
            <form method="post" action="index.php">
                <label for="name">Username:</label>
                <input type="text" id="user-ret" name="name"><br>
                <input class="button black-text-bg white-text"  type="submit" value="Retrieve" name="retRating">
            </form>
            <?php
                function retRatings(){
                    $servername = "localhost";
                    $username = "root";
                    $password = "";
                    $dbname = "music-db";

                    $conn = new mysqli($servername, $username, $password, $dbname);

                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }
                    $out_value = "";
                    $username = $_REQUEST['name'];
                    if(!empty($username)){
                        $sql_query = "SELECT song, rating FROM ratings WHERE username = ('$username')";
                        $result = mysqli_query($conn, $sql_query);
                        if(mysqli_num_rows($result)!=0){
                            while ($row = mysqli_fetch_array($result)) {
                                printf($row['song']." -> ".$row['rating']);
                                echo "<br>";
                            }
                        }else{
                            echo "User does not exist.";
                        }
                    }
                    $conn->close();
                }

                if(isset($_POST['retRating'])){
                    retRatings();
                } 
        ?>
        </div>
    </div>

    </body>
</html>