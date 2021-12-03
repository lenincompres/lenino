<? 
$filedname =$_GET['file'];

if ($filedname == 'tone') {
// This path is OUTSIDE the webroot
$filepath = "/songs/".$filedname;
} else {
$filepath = 0;
}

$filesize = filesize($filepath);

header("Pragma: no-cache");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");

// force download dialog
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");

header('Content-Disposition: attachment;filename="'.$filepath.'"');

header("Content-Transfer-Encoding: binary");

#header('Content-Type: audio/mpeg3');
header('Content-Length: '.$filesize);

@readfile($filepath);
exit(0);
?>