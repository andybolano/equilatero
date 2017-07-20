<?php
Route::resource("proyectos","proyectoController");
Route::post("proyectos/basic","proyectoController@save_informaction_basic");
Route::post("proyectos/banner","proyectoController@save_banner");
Route::post("proyectos/galeria","proyectoController@save_galeria");
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

