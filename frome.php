<?php
// เชื่อมต่อฐานข้อมูล (ปรับเปลี่ยนตามค่าจริงของคุณ)
$servername = "localhost";
$username = "yourusername";
$password = "yourpassword";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูลจากแบบฟอร์ม
$name = $_POST['name'];
$surname = $_POST['surname'];
$email = $_POST['email'];

// เตรียมคำสั่ง SQL (ป้องกัน SQL Injection)
$sql = "INSERT INTO users (name, surname, email) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $surname, $email);

// ดำเนินการคำสั่ง
if ($stmt->execute()) {
    echo "บันทึกข้อมูลสำเร็จ";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>