<?php

$server_status = file_get_contents($api_base_url . $server_status_url);
$server_status_array;
$xmlParser = xml_parser_create();
$status = xml_parse_into_struct($xmlParser, $server_status, $server_status_array, $index);
xml_parser_free($xmlParser);

//var_dump($server_status_array);

for($i = 0; $i < count($server_status_array); $i++)
{
  if($server_status_array[$i]['tag'] === 'CURRENTTIME')
  {
    $rawServerTime = $server_status_array[$i]['value'];
    preg_match('/(\d{2}):(\d{2}):(\d{2})/', $rawServerTime, $serverTime);
    $strippedServerTime = explode(':', $serverTime[0]);
  }//end if
}//end for

echo '<script type="text/javascript">';
echo 'var time_h = ' . $strippedServerTime[0] . ';';
echo 'var time_m = ' . $strippedServerTime[1] . ';';
echo 'var time_s = ' . $strippedServerTime[2] . ';';
echo '</script>';

?>