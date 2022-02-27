<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dir = './';
$files = scandir($dir);
$filtered_files = array();
foreach ($files as $file) {
  if (str_ends_with($file, '.js')) {
    array_push($filtered_files, $file);
  }
}

echo json_encode($filtered_files);
exit;
