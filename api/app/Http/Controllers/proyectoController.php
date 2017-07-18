<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Proyecto;


class proyectoController extends Controller {
     public function index() {
          return Proyecto::All();
    }

}

