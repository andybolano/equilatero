<?php
Route::resource("compromise","compromiseController");
Route::post("compromise/update","compromiseController@update");
Route::get("compromise/page/activos","compromiseController@getActivos");
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

