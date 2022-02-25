    <?php
        // Define variables and set to empty values.
        $name = $nameErr = "";
        // If the user enters a name, post it to the server.
        // $_SERVER["REQUEST_METHOD"] and $_POST are parts of the PHP language.
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (empty($_POST["name"])) {
                $nameErr = "Please enter a user.";
            } 
            else{
            $name = $_POST["name"];
            // Append the name to a csv file.
            $file = fopen($name . ".csv", "a");
            fwrite($file, $name);
            fclose($file);
            }
        }
    ?>