import cv2
from ServidorPython import*
import numpy as np
from testeLBPH import*

listaAlunos = getListaAlunos()

detectorFace = cv2.CascadeClassifier("haarcascade-frontalface-default.xml")
reconhecedor =cv2.face.LBPHFaceRecognizer_create()
reconhecedor.read("classificadorLBPH.yml")

amostra = 1
largura, altura = 250, 250
font = cv2.FONT_HERSHEY_COMPLEX_SMALL
camera = cv2.VideoCapture(0)

while True:
    conectado, imagem = camera.read()
    imagemCinza = cv2.cvtColor(imagem, cv2.COLOR_BGR2GRAY)
    facesDetectadas = detectorFace.detectMultiScale(imagemCinza, scaleFactor=1.5, flags=3, minSize=(100,100))
    if cv2.waitKey(500) & 0xFF == ord('q'):
        testeFinal()
        print("Frequência finalizada...")
        cv2.destroyAllWindows()
        break
    elif facesDetectadas != ():
        cv2.imshow("Face", imagem)

        for (x, y, l, a) in facesDetectadas:
            if np.average(imagemCinza) > 110:  # verifica a luminosidade da imagem
                imagemFace = cv2.resize(imagemCinza[y:y + a, x:x + l], (largura, altura))
                cv2.imwrite("fotos/teste/" + str(amostra) + ".jpg", imagemFace)
                print("[Foto " + str(amostra) + " capturada com sucesso.]")
                amostra += 1
    cv2.waitKey(500)
#camera.realese()
cv2.destroyAllWindows()

