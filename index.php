<html>
<head>
</head>
<body>  

<?php
$name = $phone = $email = $comment = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["name"]);
  $phone = test_input($_POST["phone"]);
  $email = test_input($_POST["email"]);
  $comment = test_input($_POST["comment"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

<h2>PHP Form Validation Example</h2>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
  Name: <input type="text" name="name">
  <br><br>
  Phone: <input type="text" name="phone">
  <br><br>
  E-mail: <input type="text" name="email">
  <br><br>
  Comment: <textarea name="comment" rows="5" cols="40"></textarea>
  <br><br>
  <input type="submit" name="submit" value="Submit">  
</form>

<?php
echo "<h2>Your Input:</h2>";
echo $name;
echo "<br>";
echo $phone;
echo "<br>";
echo $email;
echo "<br>";
echo $comment;
echo "<br>";
?>

</body>
</html>
