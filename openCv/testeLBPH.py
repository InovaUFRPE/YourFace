import cv2
import os
import numpy as np
from PIL import Image
from ServidorPython import*
def testeFinal():
    detectorFace = cv2.CascadeClassifier("haarcascade-frontalface-default.xml")
    reconhecedor = cv2.face.LBPHFaceRecognizer_create()
    reconhecedor.read("classificadorLBPH.yml")
    dicionarioResultado = {}
    totalAcertos = 0
    percentualAcerto = 0.0
    totalConfianca = 0.0
    caminhos = [os.path.join('fotos/teste', f) for f in os.listdir('fotos/teste')]

    for caminhoImagem in caminhos:
        imagemFace = Image.open(caminhoImagem).convert('L')
        imagemFaceNP = np.array(imagemFace, 'uint8')
        facesDetectadas = detectorFace.detectMultiScale(imagemFaceNP, scaleFactor= 1.3, flags= 5, minSize=(100,100))

        for (x, y, l, a) in facesDetectadas:
            idprevisto, confianca = reconhecedor.predict(imagemFaceNP)
            idatual = int(os.path.split(caminhoImagem)[1].split(".")[0])
            #print(str(idatual) + " foi classificado como " + str(idprevisto) + " - " + str(confianca))
            if confianca < 50:
                totalAcertos += 1
                totalConfianca += confianca
                idprevisto = str(idprevisto)
                if idprevisto in dicionarioResultado:
                    dicionarioResultado[idprevisto].append(idatual)
                else:
                    dicionarioResultado [idprevisto] = []
                    dicionarioResultado[idprevisto].append(idatual)
            elif idprevisto == -1:
                totalAcertos += 1
                insertDesonhecido(idatual)
                print(idatual)
            #cv2.rectangle(imagemFaceNP, (x, y), (x + l, y + a), (0, 0, 255), 2)
            #cv2.imshow("Face", imagemFaceNP)
            #cv2.waitKey(1000)

    for chave in dicionarioResultado.keys():
        if len(chave) < 11:
            id = ('0' * (11 - len(chave))) + chave
        insertAluno(chave)

    print(dicionarioResultado)
    print('Fim do teste..')
