<?php
Route::resource("proyectos","proyectoController");
Route::post("proyectos/basic","proyectoController@save_informaction_basic");
Route::post("proyectos/banner","proyectoController@save_banner");
Route::post("proyectos/galeria","proyectoController@save_galeria");
Route::post("proyectos/plano","proyectoController@save_plano");
Route::post("proyectos/finish_proccess","proyectoController@finish_proccess");
Route::post("proyectos/position","proyectoController@save_position");
Route::post("proyectos/zonas","proyectoController@save_zonas");
Route::post("proyectos/aviso","proyectoController@save_aviso");

Route::post("proyectos/update/basic","proyectoController@update_informaction_basic");
Route::post("proyectos/update/plano","proyectoController@update_plano");
Route::post("proyectos/delete/galeria","proyectoController@delete_galeria");

Route::post("proyectos/logo","proyectoController@update_logo");
Route::get("proyectos/galeria/{idProyecto}","proyectoController@getter_galeria");
Route::get("proyectos/planos/{idProyecto}","proyectoController@getter_planos");

//page
Route::get("proyectos/page/destacados/show","proyectoController@leerDestacados");
Route::get("proyectos/page/banners/show","proyectoController@leerBanners");
Route::get("proyectos/page/condiciones","proyectoController@leerCondiciones");
Route::get("proyectos/page/realizados/{state}","proyectoController@getByRealizado");
Route::get("proyectos/page/postventa","proyectoController@getByPostventa");
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

