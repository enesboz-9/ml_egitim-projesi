@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ============================================
echo   ml_egitim-projesi - GitHub'a Push Script'i
echo ============================================
echo.

REM --- Bu klasorde calisiyor muyuz kontrol et ---
if not exist "package.json" (
    echo HATA: Bu script proje kok klasorunde calistirilmali ^(package.json bulunamadi^).
    echo Lutfen bu .bat dosyasini ml-akademi klasorune koyup oradan calistirin.
    pause
    exit /b 1
)

REM --- GitHub kullanici adini al ---
set /p GITHUB_USER="GitHub kullanici adiniz: "
if "%GITHUB_USER%"=="" (
    echo HATA: Kullanici adi bos olamaz.
    pause
    exit /b 1
)

set REPO_NAME=ml_egitim-projesi
set REMOTE_URL=https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo.
echo Repo: %REMOTE_URL%
echo.
echo GitHub'da bu repoda zaten eski/farkli dosyalar olabilir.
echo Ne yapmak istersin?
echo.
echo   [1] Guncelle   - GitHub'daki ile yerel projeyi birlestir ^(pull + push^)
echo                    Eski dosyalarla cakisma olursa elle cozmen gerekebilir.
echo   [2] Uzerine yaz - GitHub'daki her seyin yerine yerel projeni koy
echo                    ^(force push^). GitHub'daki eski/farkli dosyalar SILINIR.
echo.
set /p MODE="Secimin (1 veya 2): "

if not "%MODE%"=="1" if not "%MODE%"=="2" (
    echo Gecersiz secim. Script sonlandiriliyor.
    pause
    exit /b 1
)

REM --- .gitignore yoksa olustur ---
if not exist ".gitignore" (
    echo node_modules> .gitignore
    echo .next>> .gitignore
    echo out>> .gitignore
    echo .env>> .gitignore
    echo .env.local>> .gitignore
    echo Node modulleri ve build ciktilari icin .gitignore olusturuldu.
)

REM --- Git repo baslat (zaten varsa atla) ---
if not exist ".git" (
    echo Git deposu baslatiliyor...
    git init
    git branch -M main
) else (
    echo Git deposu zaten mevcut, devam ediliyor...
)

REM --- Remote ayarla ---
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Remote ekleniyor: %REMOTE_URL%
    git remote add origin %REMOTE_URL%
) else (
    echo Mevcut remote guncelleniyor: %REMOTE_URL%
    git remote set-url origin %REMOTE_URL%
)

REM --- Commit mesaji al ---
set "COMMIT_MSG=Proje guncellemesi"
set /p COMMIT_MSG="Commit mesaji (bos birakirsan varsayilan kullanilir): "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Proje guncellemesi"

echo.
echo Degisiklikler ekleniyor (silinen dosyalar dahil)...
git add -A
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo Commit edilecek yeni bir degisiklik yok ya da commit basarisiz oldu.
)

if "%MODE%"=="2" goto FORCEPUSH

REM ============ MOD 1: GUNCELLE (pull + push) ============
echo.
echo GitHub'daki degisiklikler cekiliyor ve yerel ile birlestiriliyor...
git fetch origin
git pull origin main --allow-unrelated-histories --no-rebase
if errorlevel 1 (
    echo.
    echo ============================================
    echo   BIRLESTIRME SIRASINDA CAKISMA OLUSTU
    echo ============================================
    echo Git bazi dosyalarda cakisma buldu ^(hem GitHub'da hem yerelde
    echo degismis olabilirler^). Yapman gerekenler:
    echo  1^) VS Code / editor'de "CONFLICT" yazan dosyalari ac
    echo  2^) ^<^<^<^<^<^<^< / ======= / ^>^>^>^>^>^>^> isaretli bolumleri elle duzenle
    echo  3^) git add . 
    echo  4^) git commit
    echo  5^) git push -u origin main
    echo.
    echo Ya da bu script'i tekrar calistirip [2] Uzerine yaz secenegini
    echo kullanarak GitHub'daki eski dosyalari tamamen yerel projenle
    echo degistirebilirsin.
    pause
    exit /b 1
)

echo.
echo Degisiklikler GitHub'a gonderiliyor...
git push -u origin main
goto RESULT

REM ============ MOD 2: FORCE PUSH (uzerine yaz) ============
:FORCEPUSH
echo.
echo ============================================
echo   DIKKAT: GitHub'daki mevcut icerik SILINECEK
echo   ve yerine bu klasordeki proje yazilacak.
echo ============================================
set /p CONFIRM="Emin misin? (evet yaz / hayir): "
if /i not "%CONFIRM%"=="evet" (
    echo Islem iptal edildi.
    pause
    exit /b 0
)

echo.
echo GitHub'a zorla (force) push ediliyor...
git push -u origin main --force
goto RESULT

:RESULT
if errorlevel 1 (
    echo.
    echo ============================================
    echo   PUSH BASARISIZ OLDU
    echo ============================================
    echo Olasi nedenler:
    echo  1^) GitHub'da "%REPO_NAME%" adinda bir repo henuz olusturulmadi.
    echo  2^) Kimlik dogrulama gerekiyor ^(GitHub artik sifre yerine
    echo     Personal Access Token veya "git credential manager" ister^).
    echo.
    echo Cozum onerileri:
    echo  - https://github.com/new adresinden "%REPO_NAME%" adinda repo olusturun.
    echo  - Token ile giris icin: https://github.com/settings/tokens
) else (
    echo.
    echo ============================================
    echo   BASARILI! Proje GitHub'a push edildi.
    echo   https://github.com/%GITHUB_USER%/%REPO_NAME%
    echo ============================================
)

echo.
pause
