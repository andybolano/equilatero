<?php
Route::resource("proyectos","proyectoController");
Route::post("proyectos/basic","proyectoController@save_informaction_basic");
Route::post("proyectos/banner","proyectoController@save_banner");
Route::post("proyectos/galeria","proyectoController@save_galeria");
Route::post("proyectos/plano","proyectoController@save_plano");
Route::post("proyectos/finish_proccess","proyectoController@finish_proccess");
Route::post("proyectos/position","proyectoController@save_position");
Route::post("proyectos/zonas","proyectoController@save_zonas");
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

