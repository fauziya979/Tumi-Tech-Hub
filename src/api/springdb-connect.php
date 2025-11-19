<?php
/**
 * springdb-connect.php
 * Handles user registration via POST request.
 */

// ---------------------------
// 1. Enable error reporting (development only)
// ---------------------------
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ---------------------------
// 2. Database Configuration
// ---------------------------
$servername = "localhost";
$username = "root";       // XAMPP default
$password = "";           // XAMPP default
$dbname = "spring-minds-db"; // Your database name

// ---------------------------
// 3. Headers for JSON & CORS
// ---------------------------
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Only POST is supported."]);
    exit();
}

// ---------------------------
// 4. Connect to Database
// ---------------------------
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// ---------------------------
// 5. Get and validate POST data
// ---------------------------
$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->firstName) || empty($data->firstName) ||
    !isset($data->lastName) || empty($data->lastName) ||
    !isset($data->email) || empty($data->email) ||
    !isset($data->password) || empty($data->password) ||
    !isset($data->role) || empty($data->role)
) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    $conn->close();
    exit();
}

// Sanitize inputs
$firstName = $conn->real_escape_string($data->firstName);
$lastName = $conn->real_escape_string($data->lastName);
$email = $conn->real_escape_string($data->email);
$role = $conn->real_escape_string($data->role);
$passwordHash = password_hash($data->password, PASSWORD_DEFAULT);

// ---------------------------
// 6. Check if email exists
// ---------------------------
$checkSql = "SELECT id FROM users WHERE email = '$email'";
$checkResult = $conn->query($checkSql);

if ($checkResult && $checkResult->num_rows > 0) {
    http_response_code(409); // Conflict
    echo json_encode(["status" => "error", "message" => "This email is already in use."]);
    $conn->close();
    exit();
}

// ---------------------------
// 7. Insert user
// ---------------------------
$insertSql = "INSERT INTO users (first_name, last_name, email, password_hash, role)
              VALUES ('$firstName', '$lastName', '$email', '$passwordHash', '$role')";

if ($conn->query($insertSql) === TRUE) {
    http_response_code(201); // Created
    echo json_encode(["status" => "success", "message" => "Registration successful! Welcome to Spring Minds."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Registration failed: " . $conn->error]);
}

// Close DB connection
$conn->close();
?>
