<?php

$dir = './';
$files = scandir($dir);
$filtered_files = array();
foreach ($files as $file) {
  if (str_ends_with($file, '.js')) {
    array_push($filtered_files, $file);
  }
}
header('Content-Type: application/json');
echo json_encode($filtered_files);
exit;
