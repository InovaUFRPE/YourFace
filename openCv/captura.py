import cv2
import numpy as np
import os
classificador = cv2.CascadeClassifier("haarcascade-frontalface-default.xml")
classificadorOlho = cv2.CascadeClassifier("haarcascade-eye.xml")
camera = cv2.VideoCapture(0)
amostra =1
numeroAmostras = 100
id = input("Digite seu identificador: ")
largura, altura = 250, 250
print("Capturando faces...")

while True:
    conectado, imagem = camera.read()
    imagemCinza = cv2.cvtColor(imagem, cv2.COLOR_BGR2GRAY)
    facesDetectadas = classificador.detectMultiScale(imagemCinza, scaleFactor=1.5, flags=3, minSize=(100,100))
    for (x, y, l, a) in facesDetectadas:
        cv2.rectangle(imagem, (x,y), (x+l, y+a), (0,255,100), 3)
        regiao = imagem[y:y + a, x:x +l]
        regiaoCinzaOlho = cv2.cvtColor(regiao,cv2.COLOR_BGR2GRAY)
        olhosDetectados = classificadorOlho.detectMultiScale(regiaoCinzaOlho)

        for (ox, oy, ol, oa) in olhosDetectados:
            cv2.rectangle(regiao, (ox, oy), (ox + ol, oy + oa),(0,255, 0 ), 2)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                if np.average(imagemCinza) >110:# verifica a luminosidade da imagem
                    imagemFace = cv2.resize(imagemCinza[y:y + a, x:x+ l],(largura, altura))
                    cv2.imwrite("fotos/treinamento/" + str(id)+"." + str(amostra) +".jpg", imagemFace)
                    print("[Foto " + str(amostra) +" capturada com sucesso.]")
                    amostra += 1

    cv2.imshow("Face", imagem)
    #cv2.waitKey(1)
    if(amostra >= numeroAmostras+1):
        break
print("Captura encerrada")
camera.release()
cv2.destroyAllWindows()
