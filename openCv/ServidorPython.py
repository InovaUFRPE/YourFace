import pymysql
from datetime import datetime

def getDataHoje(tipo=None):
    
    now = datetime.now()
    data = str(now.year) + "-"
    dia = str(now.month)
    if len(dia)<2:
        data += '0'+str(now.month) + "-"
    else:
        data += str(now.month) + "-"
    data += str(now.day) + " "

    if tipo == None:
        hour = str(now.hour)
        if len(hour)<2:
            data += '0'+hour + ":"
        else:
            data += hour+ ":"
        minute = str(now.minute)
        if len(minute)<2:
            data += '0'+minute[0:-1]+ "%"
        else:
            data += minute[0:-1]+ "%"
    else:
        hour = str(now.hour)
        if len(hour)<2:
            data += '0'+hour + ":"
        else:
            data += hour+ ":"
        minute = str(now.minute)
        if len(minute)<2:
            data += '0'+minute+ ":"
        else:
            data += minute+ ":"
        data += "00"

    return data

def connex():
    return pymysql.connect(host="localhost", user="root", passwd="", db="yourface")

def getListaAlunos():
    conecxao = connex()
    listaDeAlunos = []
    try:
        sql = "SELECT cpf FROM aluno;"
        myCursor = conecxao.cursor()
        myCursor.execute(sql)

        lista = myCursor.fetchall()
        for aluno in lista:
            listaDeAlunos.append(list(aluno)[0])
    except Exception as e:
        raise e
    finally:
        conecxao.close()
    return listaDeAlunos
    
def getNome(cpfOpencv):
    conecxao = connex()
    try:
        myCursor = conecxao.cursor()
        sql = "SELECT `name` FROM `aluno` WHERE `cpf`=%s"
        myCursor.execute(sql, cpfOpencv)
        result = myCursor.fetchone()

        if result == None:
            return 4

        return result[0]
    except Exception as e:
        raise e
    finally:
        conecxao.close()

def insertAluno(cpfOpencv):
    conecxao = connex()
    try:
        myCursor = conecxao.cursor()
        sql = "UPDATE `frequencia` SET `presenca`=true WHERE `cpf_aluno`='%s' and `presenca`=false and `data` LIKE  '%s';"%(cpfOpencv,getDataHoje())
        myCursor.execute(sql)
        conecxao.commit()
    except Exception as e:
        raise e
    finally:
        conecxao.close()

def insertDesonhecido(id_foto):
    conecxao = connex()
    try:
        myCursor = conecxao.cursor()
        sql = "INSERT INTO `desconhecidos` (`id`, `data`, `id_foto`) VALUES (NULL, '%s', %s)"%(getDataHoje(True), id_foto)
        myCursor.execute(sql)
        conecxao.commit()
    except Exception as e:
        raise e
    finally:
        conecxao.close()

