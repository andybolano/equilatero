<?php

// Folder uploads file
$folder = "../uploads/";

// If does not exist folder, it is created
if(!is_dir($folder)) {
  mkdir($folder);
}

// If does not exist error
if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
  // Move file into folder
  $name = $_POST['proyecto'];
  move_uploaded_file( $_FILES["file"]["tmp_name"], $folder . $name.".jpg");
}

// Response with object file
echo json_encode([$_FILES['file'],$_POST]);
