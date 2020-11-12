#!/usr/bin/env bash
if [ $# -le 0 ]; then
    echo "Modo de uso: ${0} <metodo(1, 2 ó 3)> <directorio del nivelx>"
    exit -1
fi
AMPLITUD="dist/amplitud.js"
PROFUNDIDAD="dist/profundidad.js"
PROF_IT="dist/profundidad_it.js"
if [ $# -eq 1 ]; then
    ARCHIVO="${1}"
    if [ ! -f "${ARCHIVO}" ]; then
        echo "El directorio ${ARCHIVO} no se encontro"
        exit -1
    fi
    echo "Ejecutar con"
    echo "1 => amplitud."
    echo "2 => profundidad."
    echo "3 => profundidad iterativa."
    echo -n "Enter a number: "
    read METODO
    if [ ${METODO} == '1' ]; then
        node ${AMPLITUD} ${ARCHIVO}
        exit 0;
    fi

    if [ ${METODO} == '2' ]; then
        node ${PROFUNDIDAD} ${ARCHIVO}
        exit 0;
    fi

    if [ ${METODO} == '3' ]; then
        node ${PROF_IT} ${ARCHIVO}
        exit 0;
    fi
    echo "Modo de uso: ${0} <metodo(1, 2 ó 3)> <ruta del nivelx>"

fi

METODO="${1}"
ARCHIVO="${2}"

if [ ! -f "${ARCHIVO}" ]; then
    echo "El directorio ${ARCHIVO} no se encontro"
    exit -1
fi

if [ ${METODO} == '1' ]; then
        node ${AMPLITUD} ${ARCHIVO}
        exit 0;
fi

if [ ${METODO} == '2' ]; then
    node ${PROFUNDIDAD} ${ARCHIVO}
    exit 0;
fi

if [ ${METODO} == '3' ]; then
    node ${PROF_IT} ${ARCHIVO}
    exit 0;
fi

echo "Modo de uso: ${0} <metodo(1, 2 ó 3)> <ruta del nivelx>"


# if [ ! -f "${ARCHIVO}" ]; then 
#     echo "El archivo ${ARCHIVO} no se encontro"
#     exit -1
# fi
# if [ ! -d "${DIRECTORIO}" ]; then
#     echo "El directorio ${DIRECTORIO} no se encontro"
#     exit -1
# fi
# echo -n "Digite el nivel "
# read LEVEL
# echo ${LEVEL}
# ${EXE} ${ARCHIVO} ${DIRECTORIO} ${LEVEL}
# cat ${DIRECTORIO}/nivel${LEVEL}
