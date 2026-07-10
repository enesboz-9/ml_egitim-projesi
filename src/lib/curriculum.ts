export interface Term {
  tr: string;
  en: string;
}

export interface Branch {
  title: string;
  desc: string;
}

export interface Bridge {
  toSlug: string;
  label: string;
}

export interface MainPathStep {
  title: string;
  desc: string;
  detail?: string; // konuyu örnek, benzetme ve mekanizma açıklamasıyla derinleştiren uzun form içerik
}

export interface SubModule {
  slug: string;
  title: string;
  goal: string;
  mainPath: MainPathStep[];
  branches: Branch[];
  visual: string;
  terms: Term[];
  task: string;
  bridges?: Bridge[];
}

export interface ModuleData {
  order: number; // 1-22, ana yol üzerindeki sıra
  slug: string;
  title: string;
  shortTitle: string; // roadmap düğümünde gösterilecek kısa başlık
  goal?: string;
  mainPath?: MainPathStep[];
  branches?: Branch[];
  visual?: string;
  terms?: Term[];
  task?: string;
  bridges?: Bridge[];
  subModules?: SubModule[]; // Bölüm 2 ve 3 gibi alt bölümleri olan modüller için
}

export const curriculum: ModuleData[] = [
  {
    order: 1,
    slug: "python-temelleri",
    title: "Python Temelleri",
    shortTitle: "Python",
    goal: "Kod okuma-yazma, temel veri tiplerini ve kontrol yapılarını kullanabilme.",
    mainPath: [
      {
        title: "Değişkenler",
        desc: "Verileri bellekte isimlendirilmiş kutucuklarda saklamanın temel yolu.",
        detail:
          "Python'da bir değişken oluşturmak için tip belirtmene gerek yok; `fiyat = 150000` yazdığın an Python bu değeri otomatik olarak int olarak tanır (dinamik tipleme). Aynı isme daha sonra `fiyat = \"pahalı\"` atarsan hata almazsın — Python'da isim, sabit bir tipe değil o anki değere bağlanır. İyi bir alışkanlık olarak değişken isimlerini küçük harf ve alt çizgiyle (`arac_marka`) yazmak Python'ın PEP8 stiline uyar ve kodunu başkalarının da kolayca okumasını sağlar.",
      },
      {
        title: "Veri tipleri",
        desc: "int, float, str, list, tuple, dict, set gibi farklı veri türlerini ve ne zaman kullanılacaklarını tanıma.",
        detail:
          "int ve float sayısal işlemler için, str ise metin verisi için kullanılır. list (`[]`) değiştirilebilir (mutable) sıralı bir koleksiyondur; tuple (`()`) ise aynı mantıkta ama değiştirilemez (immutable) — bir aracın (marka, model) bilgisini tuple'da tutmak, kodun bir yerinde yanlışlıkla değiştirilmesini engeller. dict (`{}`) anahtar-değer eşleşmeleriyle çalışır (`{\"marka\": \"Toyota\", \"fiyat\": 350000}`) ve gerçek dünyadaki JSON verisinin Python karşılığıdır; set ise sırasız ve tekrar etmeyen elemanlar tutar, genelde bir listedeki tekrarları ayıklamak için kullanılır.",
      },
      {
        title: "Koşullar",
        desc: "if / elif / else ile programın farklı senaryolara göre farklı yollar izlemesini sağlama.",
        detail:
          "if bloğu koşul True ise çalışır, elif alternatif koşulları sırayla dener, else ise hiçbiri sağlanmazsa devreye girer — Python koşulları yukarıdan aşağıya sırayla değerlendirir ve ilk True bulduğu yerde durur, geri kalanları hiç kontrol etmez. Python'da 0, boş string (`\"\"`), boş liste (`[]`) ve `None` gibi değerler \"falsy\" (yanlış gibi) kabul edilir; bu yüzden `if liste:` yazmak `if len(liste) > 0:` yazmaktan daha kısa, yaygın ve \"Pythonic\" bir kullanımdır.",
      },
      {
        title: "Döngüler",
        desc: "for ve while ile aynı işlemi tekrar tekrar, otomatik olarak çalıştırma.",
        detail:
          "`for` döngüsü bir koleksiyonun (liste, string, range) elemanları üzerinde önceden bilinen sayıda gezinir; `while` ise bir koşul False olana kadar belirsiz sayıda tekrarlar, bu yüzden dikkatsiz yazılırsa sonsuz döngüye girebilir. `break` döngüyü anında durdurur, `continue` ise sadece o adımı atlayıp bir sonrakine geçer — örneğin bir araç listesinde fiyatı bütçeyi aşan ilk aracı bulduğunda `break` ile aramayı hemen durdurabilirsin, listenin geri kalanını gereksiz yere taramazsın.",
      },
      {
        title: "Fonksiyonlar",
        desc: "Tekrar kullanılabilir kod bloklarını def ile paketleyip parametre/return ile veri alışverişi yapma.",
        detail:
          "`def` ile tanımlanan bir fonksiyon parametre olarak veri alır ve `return` ile sonucu geri döndürür; `return` yazılmazsa fonksiyon otomatik olarak `None` döner. Parametrelere varsayılan değer vererek (`def hesapla(km, yil=2020):`) fonksiyonu daha esnek hale getirebilirsin — çağıran kişi `yil` parametresini vermek zorunda kalmaz. Fonksiyonlar, aynı hesaplamayı (örneğin km başına yıpranma payı) her seferinde yeniden yazmak yerine tek bir yerden yönetmeni sağlar; bu da kodun okunabilirliğini, test edilebilirliğini ve bakımını kolaylaştırır.",
      },
      {
        title: "Class",
        desc: "Verileri ve o verilerle ilgili davranışları bir arada tutan nesne şablonları oluşturma.",
        detail:
          "Bir class, verileri (öznitelik/attribute) ve o verilerle ilgili davranışları (metod/method) bir arada paketler; `__init__` metodu, o class'tan bir nesne (instance) oluşturulduğu anda otomatik çalışan kurucu fonksiyondur. Örneğin `class Arac: def __init__(self, marka, fiyat): self.marka = marka; self.fiyat = fiyat` yazdıktan sonra `araba1 = Arac(\"Renault\", 400000)` diyerek gerçek bir nesne yaratırsın. `self`, o an üzerinde işlem yapılan spesifik nesneyi temsil eder ve her metodun ilk parametresi olarak yazılır — PyTorch'taki model tanımları da temelde tam olarak bu mantığı kullanır.",
      },
      {
        title: "Exception handling",
        desc: "try / except ile programın çökmesini önleyip hataları kontrollü şekilde yönetme.",
        detail:
          "`try` bloğunun içindeki kod çalıştırılır; bir hata oluşursa program çökmek yerine ilgili `except` bloğuna atlar. Belirli hata tiplerini yakalamak (`except ValueError:`) genel bir `except:` yazmaktan daha güvenlidir, çünkü beklenmedik başka hataları da sessizce yutmamış olursun. `finally` bloğu hata olsa da olmasa da her zaman çalışır — genelde dosya kapatma gibi \"temizlik\" işlemleri için kullanılır ve programın hatalı da çıksa kaynakları düzgün bırakmasını garanti eder.",
      },
    ],
    branches: [
      {
        title: "Dosya işlemleri (JSON/CSV/XML/YAML)",
        desc:
          "\"Veri dosyalarıyla çalışmak istiyorum\" diyen kullanıcıya açılır. json.load()/json.dump() ile Python dict'lerini JSON dosyasına yazıp okuma, csv modülüyle satır satır tablo verisi işleme, xml.etree ile XML ağaçlarında gezinme ve PyYAML ile YAML konfigürasyon dosyalarını okuma — her format farklı bir senaryoya karşılık gelir (JSON: API'ler, CSV: tablo verisi, YAML: konfigürasyon dosyaları, XML: eski/kurumsal sistemler).",
      },
      {
        title: "İleri class yapıları (inheritance, magic methods)",
        desc:
          "ML kütüphanelerinin nasıl yazıldığını merak edenler için. Inheritance (kalıtım) ile bir class'ın özelliklerini başka bir class'a devretme (`class Otomobil(Arac):`), `super()` ile üst class'ın metodlarına erişme ve `__str__`, `__repr__`, `__eq__` gibi \"magic method\"larla nesnelerin nasıl yazdırılacağını veya karşılaştırılacağını özelleştirme — PyTorch'taki `nn.Module` gibi yapıların temelinde tam olarak bu mantık var.",
      },
    ],
    visual:
      "Değişken/bellek kutu şeması; veri tipi ağacı (int/float/str/list/tuple/dict/set); try-except akış şeması",
    terms: [
      { tr: "değişken", en: "variable" },
      { tr: "veri tipi", en: "data type" },
      { tr: "döngü", en: "loop" },
      { tr: "koşul", en: "conditional" },
      { tr: "fonksiyon", en: "function" },
      { tr: "sınıf", en: "class" },
      { tr: "istisna yönetimi", en: "exception handling" },
    ],
    task: "Bir CSV dosyasından araç fiyatlarını okuyup dictionary'e aktarma mini görevi",
  },
  {
    order: 2,
    slug: "veri-bilimi-kutuphaneleri",
    title: "Python Veri Bilimi Kütüphaneleri",
    shortTitle: "NumPy/Pandas",
    subModules: [
      {
        slug: "numpy",
        title: "NumPy",
        goal: "Array/matris mantığını ve vektörleştirmeyi kavrama",
        mainPath: [
          {
            title: "Array oluşturma",
            desc: "np.array(), np.zeros(), np.arange() gibi fonksiyonlarla sayısal diziler yaratma.",
            detail:
              "`np.array([1,2,3])` normal bir Python listesini NumPy dizisine çevirir; NumPy dizileri Python listelerinin aksine tek bir veri tipini tutar ve arka planda C ile optimize edilmiş bellek bloklarında saklanır, bu da işlemleri çok hızlandırır. `np.zeros((3,3))` sıfırlardan oluşan bir matris, `np.arange(0,10,2)` ise belirli aralıklarla artan bir dizi üretir — genelde model ağırlıklarını başlangıçta sıfırlamak veya hızlıca test verisi üretmek için kullanılır.",
          },
          {
            title: "Shape/Reshape",
            desc: "Bir dizinin boyut yapısını görme ve toplam eleman sayısını koruyarak yeniden şekillendirme.",
            detail:
              "`.shape` bir dizinin her boyuttaki eleman sayısını `(satır, sütun, kanal)` şeklinde tuple olarak verir; örneğin 1920x1080 çözünürlüklü RGB bir fotoğrafın shape'i `(1080, 1920, 3)`'tür. `.reshape()` toplam eleman sayısını değiştirmeden diziyi farklı bir boyut yapısına sokar — bir CNN'e görüntü verirken genelde `(yükseklik, genişlik, kanal)` formatını modelin beklediği `(batch, kanal, yükseklik, genişlik)` formatına çevirmek için kullanılır.",
          },
          {
            title: "Indexing",
            desc: "Dizinin belirli elemanlarına, satırlarına veya dilimlerine (slicing) erişme.",
            detail:
              "Tek boyutlu bir dizide `dizi[2]` üçüncü elemanı verir (indeks 0'dan başlar); çok boyutlu dizilerde `dizi[1, :, 0]` gibi virgülle ayrılmış indekslerle satır/sütun/kanal seçebilirsin. `:` slicing (dilimleme) operatörü bir aralığı seçer — örneğin `resim[:, :, 0]` bir görüntünün sadece kırmızı (R) kanalını verir, bu da RGB kanallarını ayırmanın en hızlı yoludur.",
          },
          {
            title: "Broadcasting",
            desc: "Farklı boyutlardaki dizileri döngü yazmadan otomatik olarak uyumlu hale getirip işleme.",
            detail:
              "Broadcasting, farklı boyutlardaki iki diziyi (örneğin 3x3'lük bir matris ile tek bir sayı) elemanları teker teker eşleştirerek otomatik olarak işleme sokar; NumPy küçük diziyi \"görünmez\" şekilde büyütüp boyutları uyumlu hale getirir, sen döngü yazmak zorunda kalmazsın. Örneğin bir görüntünün her pikseline aynı parlaklık değerini eklemek istediğinde `resim + 20` yazman yeterlidir — NumPy bu 20'yi otomatik olarak tüm piksellere \"yayar\".",
          },
        ],
        branches: [
          {
            title: "Vectorization vs. Python loop performans karşılaştırması",
            desc:
              "Neden NumPy hızlı? Bir milyon elemanlı bir listeyi `for` döngüsüyle toplamakla `np.sum()` ile toplamak arasında onlarca kat hız farkı olabilir; bunun sebebi NumPy'ın işlemleri C seviyesinde, tek tek Python nesneleri yerine ham bellek blokları üzerinde yapmasıdır. Deep learning'de milyonlarca parametre olduğu için bu fark kritik önemdedir.",
          },
        ],
        visual: "Bir görüntünün 1920x1080x3 boyutlu array olarak gösterimi (katman katman RGB şeması)",
        terms: [
          { tr: "dizi", en: "array" },
          { tr: "yayılım", en: "broadcasting" },
          { tr: "vektörleştirme", en: "vectorization" },
          { tr: "indeksleme", en: "indexing" },
          { tr: "yeniden şekillendirme", en: "reshape" },
        ],
        task: "Bir resmi array'e çevirip kanal (R/G/B) bazında ayırma",
      },
      {
        slug: "pandas",
        title: "Pandas",
        goal: "Tablo verisini okuma, temizleme, filtreleme, gruplama",
        mainPath: [
          {
            title: "DataFrame/Series",
            desc: "Tablo (DataFrame) ve tek sütun (Series) veri yapılarının temel mantığı.",
            detail:
              "DataFrame, satır ve sütunlardan oluşan iki boyutlu bir tablo yapısıdır (Excel sayfası gibi düşünülebilir); Series ise DataFrame'in tek bir sütununu temsil eden, indeksli tek boyutlu bir yapıdır. `df[\"fiyat\"]` yazdığında aslında bir Series elde edersin — DataFrame, birden fazla Series'in yan yana dizilmiş halidir.",
          },
          {
            title: "CSV okuma",
            desc: "pd.read_csv() ile dış kaynaklardan tablo verisini programa aktarma.",
            detail:
              "`pd.read_csv(\"araclar.csv\")` dosyayı okuyup otomatik olarak bir DataFrame'e çevirir; ayırıcı karakter (`sep=\";\"`), encoding (`encoding=\"utf-8\"`) veya başlık satırı (`header=0`) gibi parametrelerle farklı formatlardaki dosyaları da okuyabilirsin. `df.head()` ile ilk birkaç satırı hızlıca kontrol etmek, veri okurken ilk yapılması gereken adımlardan biridir.",
          },
          {
            title: "Filtreleme",
            desc: "Belirli koşulu sağlayan satırları seçme (örn. fiyatı 100.000'den düşük araçlar).",
            detail:
              "`df[df[\"fiyat\"] < 100000]` şeklinde köşeli parantez içine bir koşul yazarak sadece o koşulu sağlayan satırları seçersin — arka planda Pandas her satır için True/False bir maske üretip sadece True olanları döndürür. Birden fazla koşulu `&` (ve) ve `|` (veya) operatörleriyle birleştirebilirsin, örneğin `df[(df[\"fiyat\"] < 100000) & (df[\"marka\"] == \"Fiat\")]`.",
          },
          {
            title: "Gruplama",
            desc: "groupby() ile veriyi kategorilere ayırıp her grup için özet istatistik çıkarma.",
            detail:
              "`df.groupby(\"marka\")[\"fiyat\"].mean()` verideki her benzersiz marka için ayrı bir grup oluşturur ve her grubun fiyat ortalamasını hesaplar — SQL'deki `GROUP BY` ile aynı mantık. Gruplama; toplam (`sum`), sayım (`count`), maksimum (`max`) gibi farklı özet fonksiyonlarla da kullanılabilir ve genelde veriyi ilk kez keşfederken (\"hangi marka ortalama en pahalı?\") kullanılır.",
          },
        ],
        branches: [
          {
            title: "Eksik veri stratejileri (drop vs. impute)",
            desc:
              "İleri seviye. Eksik veriyi tamamen silmek (`dropna()`) veri kaybına yol açabilir; bunun yerine ortalama/medyan ile doldurmak (`fillna(df[\"fiyat\"].mean())`) veya daha gelişmiş yöntemlerle (KNN imputation) tahmin etmek genelde tercih edilir. Hangi stratejinin doğru olduğu, eksik verinin oranına ve nedenine bağlıdır.",
          },
        ],
        visual: "Araç fiyat veri seti tablosu üzerinde canlı filtreleme demosu (interaktif tablo widget'ı)",
        terms: [
          { tr: "veri çerçevesi", en: "DataFrame" },
          { tr: "seri", en: "Series" },
          { tr: "eksik veri", en: "missing data" },
          { tr: "gruplama", en: "group by" },
          { tr: "filtreleme", en: "filtering" },
        ],
        task: "Verilen araç veri setinde markaya göre ortalama fiyat hesaplama",
      },
      {
        slug: "matplotlib-seaborn",
        title: "Matplotlib & Seaborn",
        goal: "Veriyi görselleştirerek yorumlayabilme",
        mainPath: [
          {
            title: "Line/scatter/histogram",
            desc: "Zaman serisi, ilişki ve dağılım verilerini görselleştirmenin üç temel grafik türü.",
            detail:
              "Line plot zaman içindeki değişimi (örneğin loss'un epoch'lara göre azalması), scatter plot iki değişken arasındaki ilişkiyi (km arttıkça fiyatın düşmesi), histogram ise tek bir değişkenin dağılımını (fiyatların çoğu hangi aralıkta yoğunlaşıyor) göstermek için kullanılır. Doğru grafik türünü seçmek, veriyi doğru yorumlamanın ilk adımıdır.",
          },
          {
            title: "Confusion matrix görselleştirme",
            desc: "Bir modelin doğru/yanlış tahminlerini tablo halinde görme.",
            detail:
              "`seaborn.heatmap()` ile bir confusion matrix'i renk yoğunluğuna göre görselleştirmek, modelin hangi sınıfları birbiriyle karıştırdığını sayılara bakmaktan çok daha hızlı fark etmeni sağlar — örneğin bir modelin sürekli \"kedi\"leri \"köpek\" olarak tahmin ettiğini koyu renkli bir hücre anında gösterir.",
          },
        ],
        branches: [
          {
            title: "Heatmap ile korelasyon analizi (Seaborn)",
            desc:
              "`sns.heatmap(df.corr(), annot=True)` veri setindeki tüm sayısal sütunlar arasındaki korelasyonu (-1 ile +1 arası) renkli bir tabloda gösterir; örneğin km ile fiyat arasında güçlü negatif korelasyon (yaklaşık -0.7) olması, kilometre arttıkça fiyatın düştüğünü sayısal olarak doğrular.",
          },
        ],
        visual: "Aynı veri setinin 4 farklı grafik türüyle gösterimi (karşılaştırmalı panel)",
        terms: [
          { tr: "dağılım grafiği", en: "scatter plot" },
          { tr: "histogram", en: "histogram" },
          { tr: "ısı haritası", en: "heatmap" },
          { tr: "korelasyon", en: "correlation" },
        ],
        task: "Araç km–fiyat ilişkisini scatter plot ile gösterme",
      },
    ],
  },
  {
    order: 3,
    slug: "matematik-temelleri",
    title: "Matematik Temelleri",
    shortTitle: "Matematik",
    subModules: [
      {
        slug: "lineer-cebir",
        title: "Lineer Cebir",
        goal: "Sinir ağlarının arkasındaki matris işlemlerini anlama",
        mainPath: [
          {
            title: "Vektör",
            desc: "Yönü ve büyüklüğü olan, sayı dizileri şeklinde ifade edilen temel matematiksel nesne.",
            detail:
              "Bir vektör, yönü ve büyüklüğü olan sıralı bir sayı dizisidir; örneğin bir aracın [km, yaş, motor_hacmi] özellikleri tek bir vektör olarak ifade edilebilir. Makine öğrenmesinde her veri örneği (satır) aslında bir vektördür ve model bu vektörler üzerinde matematiksel işlemler yaparak öğrenir.",
          },
          {
            title: "Matris",
            desc: "Sayıların satır ve sütunlar halinde düzenlenmiş hali; sinir ağlarının ağırlıklarını taşır.",
            detail:
              "Matris, sayıların satır ve sütunlar halinde düzenlenmiş halidir ve bir sinir ağındaki bir katmanın tüm ağırlıklarını tek bir yapıda taşır. Örneğin 784 pikselli bir görüntüyü 128 nörona bağlayan bir katman, 784x128 boyutunda bir ağırlık matrisiyle temsil edilir.",
          },
          {
            title: "Transpoz",
            desc: "Bir matrisin satır ve sütunlarının yer değiştirmesi.",
            detail:
              "Transpoz, bir matrisin satırlarını sütun, sütunlarını satır yapar (`A.T`); iki matrisi çarpabilmek için boyutların uyuşması gerektiğinden, sinir ağı hesaplamalarında ağırlık matrisini transpoze etmek çok sık karşılaşılan bir işlemdir.",
          },
          {
            title: "Dot product",
            desc: "İki vektör/matrisin çarpılıp tek bir sayı veya yeni bir matris üretmesi; sinir ağı hesaplamalarının temeli.",
            detail:
              "İki vektörün dot product'ı (`x·w`), karşılıklı elemanların çarpılıp toplanmasıdır; bir yapay nöronun çıktısı tam olarak `girdi · ağırlık + bias` formülüyle hesaplanır. Bu tek işlem, tüm sinir ağı hesaplamalarının temel yapı taşıdır — bir katmandaki tüm nöronların çıktısı, tek bir büyük matris çarpımıyla aynı anda hesaplanır.",
          },
        ],
        branches: [
          {
            title: "Eigenvalue / Eigenvector",
            desc:
              "PCA'ya hazırlık — Bölüm 6'ya köprü. Bir matrisin eigenvector'ü, o matrisle çarpıldığında yönü değişmeyen, sadece uzunluğu (eigenvalue kadar) değişen özel bir vektördür. PCA (Principal Component Analysis), verinin en çok değiştiği yönleri (en büyük eigenvalue'lara sahip eigenvector'leri) bularak boyut indirgeme yapar.",
          },
        ],
        visual: "Input x Weight + Bias işleminin matris çarpımı animasyonu/şeması",
        terms: [
          { tr: "vektör", en: "vector" },
          { tr: "matris", en: "matrix" },
          { tr: "transpoz", en: "transpose" },
          { tr: "iç çarpım", en: "dot product" },
          { tr: "özdeğer", en: "eigenvalue" },
        ],
        task: "2x2 matrisle basit bir \"yapay nöron\" hesaplaması",
        bridges: [{ toSlug: "ml-temelleri", label: "Eigenvalue → PCA (Bölüm 6)" }],
      },
      {
        slug: "calculus",
        title: "Calculus",
        goal: "Backpropagation'ın neden türev kullandığını kavrama",
        mainPath: [
          {
            title: "Türev",
            desc: "Bir fonksiyonun belirli bir noktadaki değişim hızını ölçme.",
            detail:
              "Türev, bir fonksiyonun belirli bir noktadaki anlık eğimini/değişim hızını ölçer; loss fonksiyonunun türevi, ağırlığı biraz değiştirirsek loss'un ne kadar değişeceğini söyler. Türev sıfıra yaklaştıkça fonksiyon bir minimum veya maksimuma yaklaşıyor demektir.",
          },
          {
            title: "Kısmi türev",
            desc: "Çok değişkenli bir fonksiyonun sadece bir değişkene göre değişimini ölçme.",
            detail:
              "Bir sinir ağının loss'u onlarca/milyonlarca ağırlığa bağlıdır; kısmi türev, diğer tüm ağırlıkları sabit tutup sadece tek bir ağırlığa göre değişimi ölçer. Tüm ağırlıklara göre alınan kısmi türevlerin birleşimi gradyanı oluşturur.",
          },
          {
            title: "Gradient",
            desc: "Bir fonksiyonun tüm değişkenlere göre türevlerinin birleşimi; en dik artış yönünü gösterir.",
            detail:
              "Gradyan, bir fonksiyonun tüm değişkenlerine göre kısmi türevlerinin bir araya getirilmiş vektörüdür ve fonksiyonun en hızlı arttığı yönü gösterir. Gradient descent, ağırlıkları gradyanın tam tersi yönünde küçük adımlarla güncelleyerek loss'u azaltır — \"vadide en dik aşağı yönü takip ederek inmek\" gibi düşünülebilir.",
          },
          {
            title: "Chain rule",
            desc: "İç içe geçmiş fonksiyonların türevini adım adım hesaplama kuralı; backpropagation'ın temeli.",
            detail:
              "Chain rule, iç içe geçmiş fonksiyonların (örn. f(g(x))) türevini, her katmanın kendi türevini çarparak hesaplamanı sağlar. Bir sinir ağında çıktı katmanından girdi katmanına doğru bu kuralı tekrar tekrar uygulayarak her ağırlığın loss üzerindeki etkisini hesaplamaya \"backpropagation\" (geri yayılım) denir.",
          },
        ],
        branches: [
          {
            title: "Gradient descent'in görsel simülasyonu",
            desc:
              "Bir vadide top yuvarlama benzetmesi. Loss fonksiyonunu bir vadi, ağırlıkları da o vadideki bir topun konumu gibi düşün; top her adımda en dik iniş yönüne (negatif gradyan yönüne) doğru küçük bir adım atar ve sonunda vadinin dibine (minimum loss'a) yaklaşır. Adım büyüklüğü (learning rate) çok büyükse top vadiyi aşıp karşı yamaca sıçrayabilir.",
          },
        ],
        visual: "Loss fonksiyonu üzerinde gradient descent adım adım animasyon",
        terms: [
          { tr: "türev", en: "derivative" },
          { tr: "gradyan", en: "gradient" },
          { tr: "zincir kuralı", en: "chain rule" },
          { tr: "geri yayılım", en: "backpropagation" },
        ],
        task: "Basit bir fonksiyonun minimum noktasını gradient descent ile bulma demosu",
      },
      {
        slug: "olasilik-istatistik",
        title: "Olasılık & İstatistik",
        goal: "Veriyi istatistiksel olarak yorumlayabilme",
        mainPath: [
          {
            title: "Ortalama/medyan/varyans",
            desc: "Bir veri setinin merkezini ve yayılımını özetleyen temel istatistikler.",
            detail:
              "Ortalama tüm değerlerin toplamının sayıya bölünmesidir ama aşırı değerlerden (outlier) kolayca etkilenir; medyan ise veriyi sıraladığında ortadaki değerdir ve outlier'lara karşı daha dayanıklıdır. Varyans, değerlerin ortalamadan ne kadar uzaklaştığının karesel ortalamasıdır ve verinin ne kadar \"yayılmış\" olduğunu gösterir.",
          },
          {
            title: "Normal dağılım",
            desc: "Doğada ve veri setlerinde sıkça görülen, çan eğrisi şeklindeki olasılık dağılımı.",
            detail:
              "Normal dağılım, ortalama etrafında simetrik, çan şeklinde bir olasılık dağılımıdır; verilerin yaklaşık %68'i ortalamanın ±1 standart sapma aralığında bulunur. Birçok doğal ve ölçüm verisi bu dağılıma yakın davranır, bu yüzden istatistiksel yöntemlerin çoğu bu varsayıma dayanır.",
          },
          {
            title: "Korelasyon/Regresyon",
            desc: "İki değişken arasındaki ilişkinin yönünü/gücünü ölçme ve bu ilişkiden tahmin üretme.",
            detail:
              "Korelasyon (-1 ile +1 arası), iki değişkenin birlikte ne yönde hareket ettiğini ölçer ama nedensellik göstermez. Regresyon ise bu ilişkiyi bir matematiksel denkleme (örn. `fiyat = a × km + b`) dönüştürüp yeni bir km değeri için fiyat tahmini yapmanı sağlar.",
          },
        ],
        branches: [
          {
            title: "Bayes teoremi",
            desc:
              "Naive Bayes algoritmasına köprü. Bayes teoremi, yeni bir kanıt geldiğinde önceki bir inancı (olasılığı) güncellemenin matematiksel yoludur: P(A|B) = P(B|A)×P(A) / P(B). Naive Bayes sınıflandırıcısı, her özelliğin birbirinden bağımsız olduğunu varsayarak bu teoremi doğrudan bir sınıflandırma algoritmasına dönüştürür.",
          },
          {
            title: "Hipotez testi",
            desc:
              "Hipotez testi, gözlemlenen bir farkın (örn. iki grup arasındaki ortalama farkı) tesadüften mi yoksa gerçek bir etkiden mi kaynaklandığını p-değeri ile ölçer; p-değeri genelde 0.05'ten küçükse fark \"istatistiksel olarak anlamlı\" kabul edilir.",
          },
        ],
        visual: "Normal dağılım eğrisi üzerinde ortalama/standart sapma gösterimi",
        terms: [
          { tr: "ortalama", en: "mean" },
          { tr: "varyans", en: "variance" },
          { tr: "standart sapma", en: "standard deviation" },
          { tr: "normal dağılım", en: "normal distribution" },
          { tr: "Bayes teoremi", en: "Bayes theorem" },
        ],
        task: "Araç fiyat veri setinde outlier (aykırı değer) tespiti",
        bridges: [{ toSlug: "ml-temelleri", label: "Bayes teoremi → Naive Bayes (Bölüm 6)" }],
      },
    ],
  },
  {
    order: 4,
    slug: "veri-seti-kavramlari",
    title: "Veri Seti Kavramları",
    shortTitle: "Veri Seti",
    goal: "Dataset kavramını, yapılı/yapısız veri ayrımını ve train/val/test bölünmesini kavrama",
    mainPath: [
      {
        title: "Dataset nedir?",
        desc: "Bir modelin öğrenmesi için kullanılan, girdi ve (genellikle) etiketlerden oluşan veri topluluğu.",
        detail:
          "Bir dataset, modelin öğreneceği girdi (X) ve genellikle bu girdilere karşılık gelen doğru cevaplardan (etiket/y) oluşan bir koleksiyondur; örneğin bin adet araç fotoğrafı ve her fotoğraftaki aracın markası bir dataset oluşturur. Modelin kalitesi büyük ölçüde dataset'in kalitesine ve çeşitliliğine bağlıdır — \"garbage in, garbage out\".",
      },
      {
        title: "Structured vs Unstructured",
        desc: "Tablo gibi düzenli (structured) veri ile görüntü/metin gibi düzensiz (unstructured) veri arasındaki fark.",
        detail:
          "Structured veri, satır-sütun tablosu şeklinde düzenli bir yapıya sahiptir (Excel tablosu, veritabanı) ve doğrudan sayısal analiz edilebilir; unstructured veri ise görüntü, ses, metin gibi önceden tanımlı bir sütun yapısı olmayan veridir ve genelde önce sayısal bir temsile (vektör, tensor) dönüştürülmesi gerekir.",
      },
      {
        title: "Train/Val/Test bölme",
        desc: "Veriyi eğitim, model ayarlama ve nihai değerlendirme için üç ayrı parçaya bölme.",
        detail:
          "Train seti model ağırlıklarını öğrenmek için, validation seti eğitim sırasında modelin hiperparametrelerini (learning rate, katman sayısı vb.) ayarlamak için, test seti ise eğitim bittikten sonra modelin daha önce hiç görmediği veri üzerinde gerçek performansını ölçmek için kullanılır. Test setini eğitim sırasında hiç kullanmamak, modelin gerçek dünyadaki başarısı hakkında yanıltıcı olmayan bir tahmin verir.",
      },
    ],
    branches: [
      {
        title: "Class imbalance problemi",
        desc:
          "Bazı sınıflardan az örnek olması — ileri seviye. Örneğin 1000 araç fotoğrafının 950'si sedan, 50'si kamyonsa, model çoğunlukla sedan tahmin ederek bile yüksek accuracy elde edebilir ama kamyonları tanımakta başarısız olur. Bu problem oversampling (azınlık sınıfı çoğaltma), undersampling (çoğunluk sınıfını azaltma) veya class weight ayarlamasıyla giderilebilir.",
      },
    ],
    visual: "Kedi-köpek klasör yapısı ağacı; train/val/test pasta grafiği (%70/%15/%15)",
    terms: [
      { tr: "veri seti", en: "dataset" },
      { tr: "yapılı/yapısız veri", en: "structured/unstructured data" },
      { tr: "eğitim/doğrulama/test bölünmesi", en: "train/validation/test split" },
    ],
    task: "Verilen 100 resimlik sahte bir veri setini 70/15/15 oranında bölme egzersizi",
  },
  {
    order: 5,
    slug: "veri-on-isleme",
    title: "Veri Ön İşleme (Data Preprocessing)",
    shortTitle: "Ön İşleme",
    goal: "Ham veriyi model için hazır hale getirebilme",
    mainPath: [
      {
        title: "Data cleaning",
        desc: "Eksik, hatalı veya tutarsız verileri düzeltme ya da veri setinden çıkarma.",
        detail:
          "Veri temizleme; eksik hücreleri doldurma/silme, yinelenen satırları kaldırma (`drop_duplicates()`) ve tutarsız formatları (örn. bazı fiyatların \"150.000 TL\", bazılarının \"150000\" yazılması) standart hale getirme adımlarını kapsar. Gerçek dünya verisinin büyük bölümü temiz gelmez, bu yüzden bu adım genelde bir ML projesinin en çok zaman alan kısmıdır.",
      },
      {
        title: "Normalization",
        desc: "Verileri genellikle 0-1 aralığına ölçekleyerek modelin daha dengeli öğrenmesini sağlama.",
        detail:
          "Normalizasyon, bir özelliği (örn. km: 0-300.000) genelde 0 ile 1 arasına sıkıştırır (`(x - min) / (max - min)`); farklı ölçeklerdeki özellikler (km binlerce, yaş 1-20 gibi) aynı aralığa çekilmezse, model yanlışlıkla büyük sayılı özelliğe daha fazla önem verebilir.",
      },
      {
        title: "Standardization",
        desc: "Veriyi ortalaması 0, standart sapması 1 olacak şekilde ölçekleme.",
        detail:
          "Standardizasyon, veriyi ortalaması 0 ve standart sapması 1 olacak şekilde ölçekler (`(x - ortalama) / standart_sapma`); normalizasyondan farklı olarak sabit bir üst/alt sınırı yoktur ve outlier'lara karşı biraz daha esnektir. Gradient descent kullanan modeller (sinir ağları gibi) genelde standardize edilmiş veriyle daha hızlı ve stabil öğrenir.",
      },
      {
        title: "Feature engineering",
        desc: "Ham veriden modelin daha iyi öğrenmesini sağlayacak yeni öznitelikler türetme.",
        detail:
          "Ham veriden modelin doğrudan görmediği ama faydalı olabilecek yeni sütunlar türetmektir; örneğin üretim yılından \"araç yaşı\" (güncel yıl − üretim yılı) hesaplamak, modelin doğrudan yıl yerine daha anlamlı bir özellik kullanmasını sağlar. İyi feature engineering, çoğu zaman daha karmaşık bir modelden daha fazla performans artışı sağlar.",
      },
    ],
    branches: [
      {
        title: "Encoding teknikleri (One-Hot, Label Encoding)",
        desc:
          "Kategorik veri için. Label Encoding kategorileri (Fiat, Renault, Toyota) sırasıyla 0,1,2 gibi sayılara çevirir ama bu, aralarında olmayan bir sıralama ilişkisi (Toyota > Renault gibi) ima edebilir. One-Hot Encoding ise her kategori için ayrı bir 0/1 sütunu oluşturarak bu yanlış sıralama varsayımını ortadan kaldırır, ancak çok fazla kategori varsa sütun sayısını ciddi şekilde artırır.",
      },
    ],
    visual: "Ham veri → temizlenmiş veri → normalize edilmiş veri (öncesi/sonrası karşılaştırma tablosu)",
    terms: [
      { tr: "veri temizleme", en: "data cleaning" },
      { tr: "normalizasyon", en: "normalization" },
      { tr: "standardizasyon", en: "standardization" },
      { tr: "öznitelik mühendisliği", en: "feature engineering" },
      { tr: "kodlama", en: "encoding" },
    ],
    task: "Araç veri setinden yaş = güncel yıl − üretim yılı özelliğini türetme",
  },
  {
    order: 6,
    slug: "ml-temelleri",
    title: "Makine Öğrenmesi Temelleri",
    shortTitle: "ML Temelleri",
    goal: "Supervised/Unsupervised/Reinforcement learning ayrımını ve temel algoritmaları tanıma",
    mainPath: [
      {
        title: "Supervised (Regression/Classification)",
        desc: "Etiketli veriyle öğrenip sayısal değer (regression) veya kategori (classification) tahmin etme.",
        detail:
          "Supervised learning'de model, hem girdi hem de doğru cevabın (etiket) verildiği veriyle eğitilir; sayısal bir değer tahmin ediliyorsa (araç fiyatı) buna regression, bir kategori tahmin ediliyorsa (spam/spam değil) buna classification denir. Etiketli veri toplamak genelde maliyetli olduğundan, bu yaklaşımın en büyük kısıtı kaliteli etiketli veriye ihtiyaç duymasıdır.",
      },
      {
        title: "Unsupervised (Clustering)",
        desc: "Etiketsiz veride kendiliğinden benzer grupları bulma.",
        detail:
          "Unsupervised learning'de veri hiç etiketlenmemiştir; algoritma verideki gizli yapıyı/benzerlikleri kendi başına keşfeder. Clustering (örn. K-Means), benzer özelliklere sahip veri noktalarını (örn. benzer fiyat/km aralığındaki araçlar) otomatik olarak gruplara ayırır, kimse bu gruplara önceden isim vermemiştir.",
      },
      {
        title: "Reinforcement",
        desc: "Bir ajanın, ödül/ceza geri bildirimiyle deneme-yanılma yoluyla öğrenmesi.",
        detail:
          "Reinforcement learning'de bir ajan (agent), bir ortamda (environment) aksiyonlar alır ve bu aksiyonların sonucuna göre ödül veya ceza alır; amaç, uzun vadede toplam ödülü maksimize eden bir strateji (policy) öğrenmektir. Otonom araçların şerit takibi öğrenmesi veya oyun oynayan AI'lar (AlphaGo gibi) bu yaklaşımla eğitilir.",
      },
    ],
    branches: [
      {
        title: "Ensemble yöntemler (Random Forest, XGBoost)",
        desc:
          "\"Çoklu karar ağacı\" mantığıyla nasıl çalışır? Random Forest, birbirinden bağımsız rastgele veri alt kümeleriyle eğitilmiş onlarca karar ağacının tahminlerini oylayarak (classification) veya ortalayarak (regression) birleştirir — tek bir ağaç yerine çok sayıda ağacın \"görüşünü\" almak overfitting riskini azaltır. XGBoost ise ağaçları sırayla, her yeni ağaç bir öncekinin hatalarını düzeltecek şekilde ekleyerek eğitir (boosting), genelde Random Forest'tan daha yüksek performans verir.",
      },
      { title: "PCA ile boyut indirgeme", desc: "Bölüm 3.1 eigenvalue'ya bağlanır." },
    ],
    visual: "3 öğrenme türünü karşılaştıran şema (etiketli veri / etiketsiz veri / ödül-ceza döngüsü)",
    terms: [
      { tr: "gözetimli/gözetimsiz/pekiştirmeli öğrenme", en: "supervised/unsupervised/reinforcement learning" },
      { tr: "regresyon", en: "regression" },
      { tr: "sınıflandırma", en: "classification" },
      { tr: "kümeleme", en: "clustering" },
    ],
    task: "Basit bir Linear Regression ile araç fiyat tahmini demosu",
    bridges: [{ toSlug: "lineer-cebir", label: "PCA → Eigenvalue (Bölüm 3.1)" }],
  },
  {
    order: 7,
    slug: "model-egitim-kavramlari",
    title: "Model Eğitim Kavramları",
    shortTitle: "Eğitim Kavramları",
    goal: "Training sürecindeki temel terimleri (epoch, batch, loss, optimizer) anlama",
    mainPath: [
      {
        title: "Training",
        desc: "Modelin veriden ağırlıklarını öğrendiği süreç.",
        detail:
          "Training, modelin eğitim verisindeki örüntüleri yakalayacak şekilde ağırlıklarını adım adım güncellediği süreçtir; her adımda model bir tahmin yapar, tahminin gerçek değerden ne kadar saptığı ölçülür (loss) ve bu sapmayı azaltacak şekilde ağırlıklar güncellenir.",
      },
      {
        title: "Epoch",
        desc: "Modelin tüm eğitim veri setini bir kez baştan sona görmesi.",
        detail:
          "Bir epoch, modelin tüm eğitim veri setini (örneğin 10.000 görüntünün tamamını) bir kez baştan sona görmesi demektir. Genelde tek bir epoch yeterli öğrenme sağlamaz, bu yüzden model veri setini onlarca kez (10-100 epoch) tekrar tekrar görerek kademeli olarak iyileşir.",
      },
      {
        title: "Batch",
        desc: "Her ağırlık güncellemesinden önce modele birlikte verilen örnek grubu.",
        detail:
          "Tüm veri setini tek seferde belleğe sığdırıp işlemek genelde mümkün olmadığından, veri küçük gruplara (batch) bölünür; örneğin batch size 32 ise, model her seferinde 32 örneği birlikte işleyip ağırlıklarını bir kez günceller. Küçük batch daha gürültülü ama hızlı güncellemeler, büyük batch daha stabil ama daha fazla bellek gerektiren güncellemeler yapar.",
      },
      {
        title: "Iteration",
        desc: "Bir batch'in işlenip ağırlıkların bir kez güncellenmesi.",
        detail:
          "Bir iteration, tek bir batch'in modelden geçirilip ağırlıkların bir kez güncellenmesidir; 10.000 örneklik bir veri setinde batch size 32 ise, bir epoch tamamlamak için 10.000/32 ≈ 313 iteration gerekir.",
      },
      {
        title: "Learning rate",
        desc: "Model ağırlıklarının her adımda ne kadar büyük değişeceğini belirleyen katsayı.",
        detail:
          "Learning rate, gradyan yönünde atılan adımın büyüklüğünü belirler; çok yüksek bir learning rate modelin minimum noktayı \"atlayıp\" ıraksamasına (diverge), çok düşük bir learning rate ise eğitimin aşırı yavaş ilerlemesine veya yerel bir minimumda takılmasına yol açabilir. Genelde 0.001-0.01 aralığında başlanıp deneysel olarak ayarlanır.",
      },
      {
        title: "Loss function",
        desc: "Modelin tahminiyle gerçek değer arasındaki farkı sayısal olarak ölçen fonksiyon.",
        detail:
          "Loss function, modelin tahmini ile gerçek değer arasındaki farkı tek bir sayıya indirger; regression için genelde Mean Squared Error (MSE), classification için Cross-Entropy Loss kullanılır. Eğitimin tüm amacı bu loss değerini olabildiğince küçültmektir — loss düşüyorsa model öğreniyor demektir.",
          },
      {
        title: "Optimizer",
        desc: "Loss'u azaltmak için ağırlıkları hangi yönde/ne kadar güncelleyeceğine karar veren algoritma (SGD, Adam vb.).",
        detail:
          "Optimizer, gradyanı kullanarak ağırlıkları hangi yönde ve ne kadar güncelleyeceğine karar veren algoritmadır; SGD (Stochastic Gradient Descent) en temel yöntemdir, Adam ise her ağırlık için öğrenme oranını otomatik olarak adapte ederek genelde daha hızlı ve stabil sonuç verir, bu yüzden günümüzde en çok tercih edilen optimizer'dır.",
      },
    ],
    branches: [
      {
        title: "Learning rate scheduling",
        desc:
          "Zamanla azaltma stratejileri — ileri seviye. Eğitimin başında büyük adımlarla hızlı ilerlemek, sona doğru ise küçük adımlarla minimuma hassas şekilde yaklaşmak mantıklıdır; step decay (belirli epoch'larda learning rate'i düşürme) veya cosine annealing (learning rate'i yumuşak bir eğriyle azaltma) gibi teknikler bunu otomatikleştirir.",
      },
    ],
    visual:
      "10.000 resimlik veri setinin 10 epoch × batch 32 ile nasıl işlendiğinin akış şeması; loss eğrisi grafiği (zamanla azalan)",
    terms: [
      { tr: "epok", en: "epoch" },
      { tr: "yığın", en: "batch" },
      { tr: "iterasyon", en: "iteration" },
      { tr: "öğrenme oranı", en: "learning rate" },
      { tr: "kayıp fonksiyonu", en: "loss function" },
      { tr: "optimizer", en: "optimizer (SGD, Adam)" },
    ],
    task: "Learning rate'i çok yüksek/düşük/optimal seçince loss eğrisinin nasıl değiştiğini gösteren interaktif grafik",
  },
  {
    order: 8,
    slug: "deep-learning",
    title: "Deep Learning",
    shortTitle: "Deep Learning",
    goal: "Yapay sinir ağının katman yapısını ve aktivasyon fonksiyonlarını kavrama",
    mainPath: [
      {
        title: "Input/Hidden/Output layer",
        desc: "Verinin girdiği, işlendiği ve sonucun çıktığı sinir ağı katmanları.",
        detail:
          "Input layer ham veriyi (örn. bir görüntünün piksel değerlerini) alır, hidden layer'lar bu veriyi adım adım daha soyut özniteliklere dönüştürür (kenar → şekil → nesne parçası gibi), output layer ise nihai tahmini (sınıf olasılıkları) üretir. Bir ağda birden fazla hidden layer olması onu \"derin\" (deep) yapar.",
      },
      {
        title: "Weight/Bias",
        desc: "Her bağlantının önemini ve ek ofseti belirleyen, eğitim sırasında öğrenilen sayılar.",
        detail:
          "Weight, bir girdinin çıktı üzerindeki etkisinin gücünü belirler (büyük weight = o girdi daha önemli); bias ise girdi sıfır olsa bile nörona sabit bir ofset ekleyerek modelin daha esnek fonksiyonlar öğrenmesini sağlar. Eğitim boyunca öğrenilen tek şey aslında bu weight ve bias değerleridir.",
      },
      {
        title: "Activation function",
        desc: "Bir nöronun çıktısını doğrusal olmayan hale getirerek ağın karmaşık örüntüler öğrenmesini sağlayan fonksiyon.",
        detail:
          "Eğer aktivasyon fonksiyonu olmasaydı, art arda dizilmiş katmanlar matematiksel olarak tek bir doğrusal (linear) fonksiyona indirgenirdi ve ağ karmaşık örüntüleri öğrenemezdi. ReLU (negatifleri sıfırlar, pozitifleri olduğu gibi bırakır) gizli katmanlarda, Sigmoid (0-1 arası olasılık) ikili sınıflandırmada, Softmax ise çok sınıflı olasılık dağılımı üretmek için output katmanında kullanılır.",
      },
    ],
    branches: [
      {
        title: "Neden ReLU, Sigmoid'den daha çok tercih edilir?",
        desc:
          "Vanishing gradient problemi. Sigmoid fonksiyonunun türevi uç değerlerde neredeyse sıfıra yaklaşır; derin bir ağda bu küçük türevler katman katman çarpılınca gradyan gittikçe küçülür ve ilk katmanlar neredeyse hiç öğrenemez (vanishing gradient). ReLU, pozitif bölgede türevi sabit 1 olduğu için bu sorunu büyük ölçüde ortadan kaldırır ve hesaplaması da çok daha ucuzdur.",
      },
    ],
    visual: "Katmanlı sinir ağı diyagramı (nöron-bağlantı şeması); aktivasyon fonksiyonlarının grafik karşılaştırması",
    terms: [
      { tr: "sinir ağı", en: "neural network" },
      { tr: "katman", en: "layer" },
      { tr: "ağırlık", en: "weight" },
      { tr: "bias", en: "bias" },
      { tr: "aktivasyon fonksiyonu", en: "activation function (sigmoid, ReLU, softmax)" },
    ],
    task: "Tek nöronlu basit bir ağın forward pass hesaplaması (elle adım adım)",
  },
  {
    order: 9,
    slug: "frameworkler",
    title: "Frameworkler (TensorFlow & PyTorch)",
    shortTitle: "TF & PyTorch",
    goal: "İki büyük framework'ün temel yapı taşlarını tanıma ve ne zaman hangisinin tercih edildiğini bilme",
    mainPath: [
      {
        title: "Tensor kavramı",
        desc: "Skaler, vektör ve matrislerin genelleştirilmiş hali; framework'lerin temel veri yapısı.",
        detail:
          "Tensor, skaler (0 boyut), vektör (1 boyut), matris (2 boyut) kavramlarının herhangi bir boyuta genelleştirilmiş halidir; bir renkli görüntü 3 boyutlu (yükseklik, genişlik, kanal), bir video ise 4 boyutlu (zaman, yükseklik, genişlik, kanal) bir tensor olarak temsil edilebilir. PyTorch ve TensorFlow'daki tüm veri ve ağırlıklar tensor olarak tutulur.",
      },
      {
        title: "Model oluşturma",
        desc: "Katmanları bir araya getirerek bir sinir ağı mimarisi tanımlama.",
        detail:
          "PyTorch'ta `nn.Module` sınıfından türeyen bir class içinde katmanlar `__init__`'te tanımlanır, verinin katmanlardan nasıl geçeceği ise `forward()` metodunda belirtilir. TensorFlow/Keras'ta ise genelde `Sequential` veya Functional API ile katmanlar sırayla eklenerek model tanımlanır — iki yaklaşım da sonuçta aynı matematiksel yapıyı kurar.",
      },
      {
        title: "Training döngüsü",
        desc: "Veriyi modele verip, loss hesaplayıp, ağırlıkları güncelleyen tekrarlı süreç.",
        detail:
          "Klasik bir training döngüsü şu adımları tekrarlar: veriyi modele ver (forward pass) → loss hesapla → gradyanları hesapla (backward pass, `loss.backward()`) → optimizer ile ağırlıkları güncelle (`optimizer.step()`) → gradyanları sıfırla (`optimizer.zero_grad()`). Bu döngü, veri setindeki tüm batch'ler ve epoch'lar boyunca tekrar eder.",
      },
    ],
    branches: [
      {
        title: "PyTorch'ta Dataset/DataLoader/Autograd derinlemesine",
        desc:
          "Araştırmacılar neden PyTorch'u tercih ediyor? `Dataset` sınıfı veriye nasıl erişileceğini tanımlar, `DataLoader` ise bu veriyi otomatik olarak batch'lere böler, karıştırır (shuffle) ve paralel olarak yükler. Autograd, her tensor işlemini arka planda bir hesaplama grafiğinde takip ederek `.backward()` çağrıldığında tüm gradyanları otomatik hesaplar — araştırmacılar bu esnekliği ve Python'a yakın \"dinamik graf\" yapısını sevdiği için PyTorch'u tercih eder.",
      },
    ],
    visual: "TensorFlow vs PyTorch kod karşılaştırma paneli (yan yana aynı modelin iki framework'teki hali)",
    terms: [
      { tr: "tensör", en: "tensor" },
      { tr: "otomatik türev", en: "autograd" },
      { tr: "ileri/geri yayılım", en: "forward/backward pass" },
      { tr: "veri yükleyici", en: "DataLoader" },
    ],
    task: "Aynı basit modelin PyTorch'ta tanımlanma adımlarının etkileşimli gösterimi",
  },
  {
    order: 10,
    slug: "computer-vision-temelleri",
    title: "Computer Vision Temelleri",
    shortTitle: "CV Temelleri",
    goal: "Görüntünün bilgisayar için ne anlama geldiğini ve temel görüntü işleme adımlarını kavrama",
    mainPath: [
      {
        title: "Pixel/RGB/Grayscale/Channel",
        desc: "Bir görüntünün sayısal olarak piksel, renk kanalı ve gri tonlama açısından nasıl temsil edildiği.",
        detail:
          "Bir dijital görüntü, her biri 0-255 arası bir parlaklık değeri taşıyan piksellerden oluşur; renkli bir görüntüde her piksel Red/Green/Blue (RGB) olmak üzere 3 kanal değeri taşırken, grayscale (gri tonlama) görüntüde tek bir kanal (parlaklık) yeterlidir. Bir 1920x1080 RGB görüntü aslında 1920×1080×3 ≈ 6.2 milyon sayıdan oluşan bir array'dir.",
      },
      {
        title: "OpenCV temel işlemler",
        desc: "Görüntüyü yeniden boyutlandırma (resize), kırpma (crop), bulanıklaştırma (blur) ve kenar tespiti (edge detection) gibi temel işlemler.",
        detail:
          "`cv2.resize()` görüntüyü modelin beklediği sabit boyuta (örn. 640x640) getirir, `cv2.GaussianBlur()` gürültüyü azaltıp keskin kenarları yumuşatır, `cv2.Canny()` ise görüntüdeki ani parlaklık değişimlerini (kenarları) tespit eder. Bu işlemler genelde bir CV pipeline'ının modele veri vermeden önceki ilk adımlarıdır.",
      },
    ],
    branches: [
      {
        title: "Morphology işlemleri (erosion/dilation)",
        desc:
          "İleri görüntü işleme. Erosion, bir görüntüdeki beyaz bölgeleri (genelde ön plan nesnelerini) aşındırıp küçültür, dilation ise tam tersine genişletir; bu iki işlem birlikte kullanılarak (opening/closing) gürültü temizlenebilir veya kopuk parçalar birleştirilebilir, özellikle segmentasyon sonrası maske temizlemede sık kullanılır.",
      },
    ],
    visual: "Bir fotoğrafın RGB kanallarına ayrılmış hali; edge detection öncesi/sonrası",
    terms: [
      { tr: "piksel", en: "pixel" },
      { tr: "çözünürlük", en: "resolution" },
      { tr: "kanal", en: "channel" },
      { tr: "kenar tespiti", en: "edge detection" },
      { tr: "eşikleme", en: "threshold" },
    ],
    task: "Yüklenen bir görselde blur ve edge detection filtrelerini canlı deneme",
  },
  {
    order: 11,
    slug: "cnn",
    title: "CNN (Convolutional Neural Network)",
    shortTitle: "CNN",
    goal: "YOLO'nun temelini oluşturan convolution mantığını kavrama",
    mainPath: [
      {
        title: "Convolution",
        desc: "Bir filtrenin görüntü üzerinde kayarak öznitelik çıkarması işlemi.",
        detail:
          "Convolution işleminde küçük bir filtre (örn. 3x3), görüntü üzerinde kayarak her konumda filtre ile altındaki piksellerin elementwise çarpımının toplamını hesaplar; bu, görüntüdeki yerel örüntüleri (kenar, köşe, doku) yakalamanın matematiksel yoludur. Aynı filtre görüntünün her yerinde kullanıldığı için (parameter sharing), CNN'ler tam bağlantılı ağlara göre çok daha az parametreyle çalışır.",
      },
      {
        title: "Kernel/Filtre",
        desc: "Convolution işleminde kullanılan, belirli örüntüleri (kenar, doku vb.) yakalayan küçük sayı matrisi.",
        detail:
          "Bir kernel, eğitim sırasında öğrenilen sayılardan oluşan küçük bir matristir (örn. 3x3 veya 5x5); bazı kernel'lar dikey kenarları, bazıları yatay kenarları, derin katmanlardaki kernel'lar ise \"tekerlek\" veya \"far\" gibi daha karmaşık örüntüleri yakalayacak şekilde kendiliğinden öğrenilir.",
      },
      {
        title: "Feature map",
        desc: "Bir konvolüsyon katmanının ürettiği, öznitelikleri temsil eden çıktı.",
        detail:
          "Bir kernel, tüm görüntü üzerinde gezdirildiğinde, o kernel'ın görüntünün her bölgesinde ne kadar \"aktive\" olduğunu gösteren yeni bir 2 boyutlu çıktı üretir — buna feature map denir. Bir katmanda genelde onlarca/yüzlerce farklı kernel kullanılır, bu yüzden bir katmanın çıktısı aslında bir feature map yığınıdır (örn. 64 kanal).",
      },
      {
        title: "Pooling",
        desc: "Feature map'i küçülterek hesaplama yükünü azaltan ve önemli bilgiyi koruyan işlem.",
        detail:
          "Max pooling, bir bölgedeki (örn. 2x2) piksellerin en büyüğünü alarak feature map'i küçültür; bu hem hesaplama yükünü azaltır hem de nesnenin görüntüdeki tam konumundan bağımsız (translation invariant) bir temsil oluşturur — nesne birkaç piksel kaysa bile aynı özellik yakalanmaya devam eder.",
      },
    ],
    branches: [
      {
        title: "Farklı kernel boyutlarının (3x3 vs 5x5) etkisi",
        desc:
          "Görsel deney. Küçük kernel'lar (3x3) daha az parametreyle daha yerel/ince detayları yakalar ve üst üste dizilerek (birkaç 3x3 katmanı) büyük bir kernel'ın (5x5, 7x7) etkisini daha az parametreyle taklit edebilir — modern mimarilerin (ResNet, YOLO) çoğunlukla 3x3 kernel tercih etmesinin nedeni budur.",
      },
    ],
    visual: "3x3 filtrenin bir görüntü üzerinde kayarak feature map ürettiği animasyon",
    terms: [
      { tr: "evrişim", en: "convolution" },
      { tr: "çekirdek", en: "kernel" },
      { tr: "öznitelik haritası", en: "feature map" },
      { tr: "havuzlama", en: "max/average pooling" },
    ],
    task: "Basit bir kenar-belirleme kernelinin küçük bir görüntü üzerinde adım adım uygulanması",
  },
  {
    order: 12,
    slug: "object-detection-kavramlari",
    title: "Object Detection Kavramları",
    shortTitle: "Detection Kavramları",
    goal: "Classification, Detection, Segmentation arasındaki farkı kavrama",
    mainPath: [
      {
        title: "Classification (\"Bu ne?\")",
        desc: "Bir görüntünün hangi sınıfa ait olduğunu belirleme.",
        detail:
          "Classification, bir görüntünün bütün olarak hangi sınıfa ait olduğunu söyler (\"bu bir kedi fotoğrafı\") ama görüntüde birden fazla nesne varsa veya nesnenin konumu önemliyse yetersiz kalır — sadece tek bir etiket üretir.",
      },
      {
        title: "Detection (\"Nerede?\")",
        desc: "Görüntüdeki nesnelerin sınıfını ve konumunu (bounding box) birlikte bulma.",
        detail:
          "Detection, görüntüdeki her nesne için hem sınıfı hem de konumunu (bounding box koordinatları) aynı anda tahmin eder; bir fotoğrafta 3 farklı araç varsa, detection modeli 3 ayrı kutu ve her biri için bir sınıf etiketi döndürür.",
      },
      {
        title: "Segmentation (piksel bazlı)",
        desc: "Görüntüdeki her pikseli bir sınıfa atayarak nesnenin tam sınırını belirleme.",
        detail:
          "Segmentation, görüntüdeki her tek pikseli bir sınıfa atar, böylece nesnenin tam ve düzensiz sınırı (dikdörtgen değil, gerçek şekli) ortaya çıkar; bu, örneğin bir aracın gövde hattını hassas şekilde çıkarmak gerektiğinde bounding box'tan çok daha fazla bilgi verir ama hesaplama açısından da daha maliyetlidir.",
      },
    ],
    branches: [
      {
        title: "Instance segmentation vs semantic segmentation farkı",
        desc:
          "Semantic segmentation, aynı sınıftaki tüm pikselleri tek bir grup olarak işaretler (örn. görüntüdeki tüm arabalar aynı renkte boyanır, kaç tane olduğu belli olmaz); instance segmentation ise aynı sınıftan olsa bile her nesneyi ayrı bir örnek (instance) olarak ayırt eder (örn. her araç farklı renkte, \"araç 1\", \"araç 2\" gibi).",
      },
    ],
    visual: "Aynı araba fotoğrafı üzerinde 3 farklı çıktı: sadece etiket / bounding box / piksel maskesi",
    terms: [
      { tr: "sınıflandırma", en: "classification" },
      { tr: "nesne tespiti", en: "object detection" },
      { tr: "bölütleme", en: "segmentation" },
      { tr: "örnek/anlamsal bölütleme", en: "instance/semantic segmentation" },
    ],
    task: "Bir görsel üzerinde \"bu classification mı, detection mı, segmentation mı?\" tahmin oyunu",
  },
  {
    order: 13,
    slug: "yolo-ekosistemi",
    title: "YOLO Ekosistemi",
    shortTitle: "YOLO",
    goal: "YOLO'nun ne olduğunu, versiyon farklarını ve temel kavramlarını (bounding box, IoU, NMS) kavrama",
    mainPath: [
      {
        title: "YOLO nedir",
        desc: "Görüntüyü tek bir geçişte tarayarak nesneleri gerçek zamanlı tespit eden model ailesi.",
        detail:
          "YOLO (You Only Look Once), görüntüyü klasik yöntemler gibi önce bölgelere ayırıp sonra her bölgeyi ayrı ayrı incelemek yerine, tüm görüntüyü tek bir sinir ağı geçişinde (\"tek bakışta\") tarayarak hem nesnelerin konumunu hem sınıfını aynı anda tahmin eder. Bu tek-geçişli yapı, YOLO'yu gerçek zamanlı (video akışında saniyede onlarca kare) çalışabilecek kadar hızlı yapar.",
      },
      {
        title: "Bounding box",
        desc: "Tespit edilen nesnenin etrafını saran dikdörtgen kutu.",
        detail:
          "Bir bounding box genelde merkez koordinatı (x, y) ile genişlik ve yükseklik (w, h) şeklinde 4 sayıyla ifade edilir; YOLO bu koordinatları genelde görüntü boyutuna göre normalize edilmiş (0-1 arası) değerler olarak tahmin eder, böylece farklı çözünürlükteki görüntülerde de aynı format kullanılabilir.",
      },
      {
        title: "Confidence score",
        desc: "Modelin bir tespitin doğruluğuna ne kadar \"güvendiğini\" gösteren olasılık değeri.",
        detail:
          "Confidence score, hem \"bu kutuda gerçekten bir nesne var mı\" hem de \"bu kutu nesneyi ne kadar iyi kapsıyor\" bilgisini birleştiren 0-1 arası bir olasılık değeridir. Genelde bir eşik değeri (örn. 0.5) belirlenir ve bu eşiğin altındaki tahminler \"nesne yok\" sayılarak elenir.",
      },
      {
        title: "IoU",
        desc: "İki kutunun (tahmin ve gerçek) örtüşme oranını ölçen metrik.",
        detail:
          "IoU (Intersection over Union), tahmin edilen kutu ile gerçek (ground truth) kutunun kesişim alanının, birleşim alanına bölünmesiyle hesaplanır; 1'e ne kadar yakınsa kutular o kadar iyi örtüşüyor demektir. IoU aynı zamanda bir tahminin \"doğru\" sayılıp sayılmayacağına karar vermek için bir eşik (genelde 0.5) olarak da kullanılır.",
      },
      {
        title: "NMS",
        desc: "Aynı nesne için üretilen çakışan kutulardan sadece en iyisini bırakıp diğerlerini eleyen algoritma.",
        detail:
          "Bir nesne için model genelde birbirine yakın, çakışan birden fazla kutu üretir; NMS en yüksek confidence'a sahip kutuyu tutar, onunla IoU'su belirli bir eşiği aşan (yani neredeyse aynı yeri işaret eden) diğer tüm kutuları eler. Bu işlem sonunda her gerçek nesne için tek bir temiz kutu kalır.",
      },
    ],
    branches: [
      {
        title: "YOLO versiyonları arası farklar (v3 → v8 → v11)",
        desc:
          "Mimari evrim özeti. YOLOv3 çoklu ölçekte tahmin yaparak küçük nesneleri yakalamayı iyileştirdi; YOLOv5/v8 anchor-free yaklaşımlara ve daha modüler, PyTorch tabanlı bir mimariye geçti; YOLOv8 ve sonrası segmentation ve pose estimation gibi görevleri de aynı ailede birleştirdi. Her versiyon genelde daha az parametreyle daha yüksek mAP hedefler.",
      },
      {
        title: "Annotation araçları karşılaştırması",
        desc:
          "LabelImg, CVAT, Roboflow, Label Studio. LabelImg basit, tek makinede çalışan, offline bir bounding box etiketleme aracıdır; CVAT ve Label Studio ekip halinde çalışmaya uygun, tarayıcı tabanlı ve daha gelişmiş (segmentation, video annotation) özellikler sunar; Roboflow ise etiketleme, augmentation ve format dönüştürmeyi tek bir web platformunda birleştirir, bu yüzden hızlı prototipleme için sıkça tercih edilir.",
      },
    ],
    visual:
      "IoU hesaplamasını gösteren iki kutu kesişim/birleşim şeması; NMS öncesi/sonrası (çakışan kutuların temizlenmesi)",
    terms: [
      { tr: "sınırlayıcı kutu", en: "bounding box" },
      { tr: "güven skoru", en: "confidence score" },
      { tr: "kesişim/birleşim oranı", en: "IoU (Intersection over Union)" },
      { tr: "maksimum olmayanı bastırma", en: "NMS (Non-Maximum Suppression)" },
      { tr: "etiketleme", en: "annotation" },
    ],
    task: "İki bounding box verilip IoU değerini interaktif olarak hesaplatma",
    bridges: [{ toSlug: "veri-seti-kaynaklari", label: "Annotation pipeline → Veri Seti Kaynakları (Bölüm 21)" }],
  },
  {
    order: 14,
    slug: "veri-seti-formatlari",
    title: "Veri Seti Formatları",
    shortTitle: "Veri Formatları",
    goal: "YOLO, COCO ve Pascal VOC formatlarını ayırt edip dönüştürebilme",
    mainPath: [
      {
        title: "YOLO txt format",
        desc: "Her satırda sınıf ve normalize edilmiş kutu koordinatlarının yer aldığı basit metin formatı.",
        detail:
          "Her görüntü için aynı isimde bir .txt dosyası oluşturulur; dosyadaki her satır bir nesneyi temsil eder ve `sınıf_id x_merkez y_merkez genişlik yükseklik` şeklinde, tüm koordinatlar 0-1 arasına normalize edilmiş olarak yazılır. Bu format basitliği sayesinde en hızlı okunan ve en az yer kaplayan formatlardan biridir.",
      },
      {
        title: "COCO JSON format",
        desc: "Görüntü, kategori ve annotation bilgilerinin tek bir JSON dosyasında yapılandırıldığı yaygın format.",
        detail:
          "COCO formatı tüm veri setinin annotation bilgisini (görüntü isimleri, kategori listesi, her nesnenin kutu koordinatları ve segmentasyon maskesi) tek bir büyük JSON dosyasında toplar; bu, veri setinin bütünlüğünü tek dosyada tutmayı kolaylaştırır ama dosya çok büyük veri setlerinde oldukça şişebilir.",
      },
      {
        title: "Pascal VOC XML format",
        desc: "Her görüntü için ayrı bir XML dosyasında nesne ve kutu bilgisi tutan eski ama hâlâ kullanılan format.",
        detail:
          "Pascal VOC formatında her görüntü için ayrı bir XML dosyası oluşturulur ve bu dosyada görüntü boyutu, her nesnenin sınıfı ile kutu köşe koordinatları (xmin, ymin, xmax, ymax — normalize edilmemiş piksel değerleri) yer alır. Daha eski ama hâlâ birçok akademik veri setinde ve araçta desteklenen bir formattır.",
      },
    ],
    branches: [
      {
        title: "Formatlar arası dönüştürme script mantığı",
        desc:
          "Neden gerekli? Bir veri setini Roboflow'dan COCO formatında indirip YOLO ile eğitmek istiyorsan, önce COCO'nun piksel bazlı (xmin,ymin,xmax,ymax) koordinatlarını YOLO'nun normalize edilmiş (x_merkez,y_merkez,genişlik,yükseklik) formatına çevirmen gerekir; bu dönüşüm görüntü boyutuna bölme ve merkez/genişlik hesaplama gibi basit ama hataya açık matematiksel işlemler içerir, bu yüzden genelde hazır script'ler (`roboflow`, `fiftyone` gibi kütüphaneler) kullanılır.",
      },
    ],
    visual: "Aynı annotation'ın 3 formatta yan yana gösterimi (txt/json/xml)",
    terms: [
      { tr: "etiketleme formatı", en: "annotation format" },
      { tr: "kutu formatı", en: "bounding box format" },
      { tr: "sınıf indeksi", en: "class index" },
    ],
    task: "Verilen bir COCO JSON annotation'ını YOLO txt formatına \"elle\" çevirme egzersizi",
  },
  {
    order: 15,
    slug: "veri-artirma",
    title: "Veri Artırma (Data Augmentation)",
    shortTitle: "Data Augmentation",
    goal: "Az veriyle çalışırken veri çeşitliliğini artırma tekniklerini bilme",
    mainPath: [
      {
        title: "Flip",
        desc: "Görüntüyü yatay/dikey eksende ters çevirme.",
        detail:
          "Görüntüyü yatayda (soldan sağa) veya dikeyde ters çevirmek, modelin nesneyi sadece belirli bir yönde görmeye alışmasını engeller; örneğin sağa bakan bir aracın fotoğrafını yatay çevirerek sola bakan bir örnek de üretmiş olursun, bounding box koordinatları da buna göre yeniden hesaplanmalıdır.",
      },
      {
        title: "Rotation",
        desc: "Görüntüyü belirli bir açıyla döndürme.",
        detail:
          "Görüntüyü belirli bir açıyla (örn. ±15 derece) döndürmek, kameranın her zaman tam düz tutulmayacağı gerçek dünya senaryolarına karşı modeli dayanıklı hale getirir; döndürme sırasında bounding box'ların da yeni köşe koordinatlarına göre güncellenmesi gerekir.",
      },
      {
        title: "Crop",
        desc: "Görüntüden belirli bir bölgeyi kırpma.",
        detail:
          "Görüntüden rastgele bir bölge kırpmak, modelin nesneyi her zaman görüntünün tam ortasında görmeye alışmasını engeller ve kısmen kesilmiş (occluded) nesneleri tanımayı da öğretir; kırpma sırasında görüntü dışına taşan bounding box'ların ya kırpılması ya da o örneğin veri setinden çıkarılması gerekir.",
      },
      {
        title: "Brightness",
        desc: "Görüntünün parlaklığını/kontrastını değiştirme.",
        detail:
          "Parlaklık/kontrast değişimi, modelin farklı ışık koşullarında (gündüz, alacakaranlık, aşırı güneş) çekilmiş fotoğraflarda da doğru tahmin yapabilmesini sağlar; bu genelde piksel değerlerine sabit bir sayı ekleyip çıkararak veya çarparak uygulanır.",
      },
      {
        title: "Noise",
        desc: "Görüntüye kontrollü gürültü ekleyerek modelin daha genelleyici öğrenmesini sağlama.",
        detail:
          "Görüntüye kontrollü rastgele gürültü (örn. Gaussian noise) eklemek, modelin düşük kaliteli kameralardan veya sıkıştırma artefaktlarından gelen gerçek dünya gürültüsüne karşı daha dayanıklı (robust) olmasını sağlar.",
      },
    ],
    branches: [
      {
        title: "MixUp ve Mosaic",
        desc:
          "YOLO'ya özgü ileri augmentation teknikleri. MixUp, iki farklı görüntüyü belirli bir oranla şeffaf şekilde üst üste bindirip etiketlerini de aynı oranda karıştırır; Mosaic ise 4 farklı görüntüyü tek bir karede birleştirerek modele aynı anda daha fazla bağlam ve farklı ölçekte nesne gösterir — YOLOv4'ten itibaren varsayılan augmentation stratejilerinden biri haline gelmiştir.",
      },
    ],
    visual: "Tek bir görselin 6 farklı augmentation uygulanmış hallerinin galeri görünümü",
    terms: [
      { tr: "veri artırma", en: "data augmentation" },
      { tr: "çevirme", en: "flip" },
      { tr: "mozaikleme", en: "mosaic" },
      { tr: "karıştırma", en: "mixup" },
    ],
    task: "Yüklenen bir görsele augmentation filtrelerini canlı uygulayıp sonucu görme",
  },
  {
    order: 16,
    slug: "model-degerlendirme",
    title: "Model Değerlendirme",
    shortTitle: "Değerlendirme",
    goal: "Classification ve Detection için doğru metrikleri seçip yorumlayabilme",
    mainPath: [
      {
        title: "Accuracy/Precision/Recall/F1",
        desc: "Bir modelin doğru tahmin oranını farklı açılardan (genel doğruluk, kesinlik, duyarlılık, dengeli ortalama) ölçen metrikler.",
        detail:
          "Accuracy, tüm tahminlerin ne kadarının doğru olduğunu gösterir ama dengesiz veri setlerinde yanıltıcı olabilir; Precision, \"pozitif\" dediklerinin gerçekten ne kadarının pozitif olduğunu (yanlış alarmları önemser), Recall ise gerçek pozitiflerin ne kadarını yakalayabildiğini (kaçırılanları önemser) ölçer. F1 skoru, precision ve recall'un dengeli bir ortalamasıdır (harmonik ortalama) ve ikisi arasında denge kurmak istendiğinde kullanılır.",
      },
      {
        title: "mAP/AP50/AP50-95",
        desc: "Nesne tespiti modellerinin farklı IoU eşiklerindeki başarısını özetleyen ortalama kesinlik metrikleri.",
        detail:
          "AP (Average Precision), belirli bir IoU eşiğinde precision-recall eğrisinin altındaki alandır; AP50, IoU eşiği 0.5 iken hesaplanan AP'dir (daha toleranslı), AP50-95 ise 0.5'ten 0.95'e kadar birden çok eşikte hesaplanan AP'lerin ortalamasıdır (daha katı, konum hassasiyetini de ödüllendirir). mAP (mean AP), bu değerin tüm sınıflar üzerinden ortalamasıdır ve object detection modellerini karşılaştırmanın standart yoludur.",
      },
    ],
    branches: [
      {
        title: "Precision-Recall trade-off'unun görsel açıklaması",
        desc:
          "Neden accuracy tek başına yeterli değil? Confidence eşiğini düşürürsen model daha fazla nesneyi \"pozitif\" sayar — recall artar ama yanlış pozitifler de arttığından precision düşer; eşiği yükseltirsen tam tersi olur. Bu ödünleşim precision-recall eğrisi üzerinde görselleştirilir ve hangi eşiğin kullanılacağı, uygulamanın yanlış pozitife mi yoksa kaçırmaya mı (yanlış negatif) daha duyarlı olduğuna bağlıdır.",
      },
    ],
    visual: "Confusion matrix üzerinden Precision/Recall hesaplama şeması; mAP hesaplama akışı",
    terms: [
      { tr: "doğruluk", en: "accuracy" },
      { tr: "kesinlik", en: "precision" },
      { tr: "duyarlılık", en: "recall" },
      { tr: "F1 skoru", en: "F1 score" },
      { tr: "ortalama kesinlik", en: "mAP (mean Average Precision)" },
    ],
    task: "Verilen bir confusion matrix'ten precision/recall'u interaktif hesaplatma",
  },
  {
    order: 17,
    slug: "overfitting-underfitting",
    title: "Overfitting / Underfitting",
    shortTitle: "Over/Underfitting",
    goal: "Modelin ezberlemesi ile öğrenememesi arasındaki farkı tanıyıp çözüm üretebilme",
    mainPath: [
      {
        title: "Overfitting",
        desc: "Modelin eğitim verisini ezberleyip yeni veride başarısız olması; belirtileri ve çözümleri (regularization, dropout, daha fazla veri).",
        detail:
          "Overfitting'de model, eğitim verisindeki gürültüyü ve tesadüfi detayları bile \"ezberler\", bu yüzden eğitim setinde neredeyse mükemmel ama yeni/görmediği veride kötü performans gösterir; belirtisi, training loss düşmeye devam ederken validation loss'un bir noktadan sonra artmaya başlamasıdır. Dropout, regularization (L1/L2), daha fazla/çeşitli veri veya data augmentation ile azaltılabilir.",
      },
      {
        title: "Underfitting",
        desc: "Modelin veri setindeki örüntüleri yeterince öğrenememesi; belirtileri ve çözümleri (daha karmaşık model, daha uzun eğitim).",
        detail:
          "Underfitting'de model, veri setindeki temel örüntüleri bile yakalayamaz; hem eğitim hem validation loss yüksek kalır. Genelde modelin çok basit olması (yetersiz katman/parametre), yetersiz eğitim süresi veya kötü feature engineering'den kaynaklanır — çözüm genelde daha karmaşık bir mimari veya daha uzun eğitim kullanmaktır.",
      },
    ],
    branches: [
      {
        title: "Dropout'un matematiksel olarak nasıl çalıştığı",
        desc:
          "Dropout, her eğitim adımında rastgele seçilen bir oranda (örn. %20-50) nöronu geçici olarak \"kapatarak\" (çıktısını sıfırlayarak) o adımda hesaba katmaz; bu, ağın belirli birkaç nörona aşırı bağımlı hale gelmesini engeller ve her seferinde biraz farklı bir alt-ağ eğitilmiş gibi davranarak modelin genelleme yeteneğini artırır. Test aşamasında dropout kapatılır ve tüm nöronlar aktif olur.",
      },
    ],
    visual: "Train/validation loss eğrilerinin overfitting durumunda ayrışması (klasik \"çatallanan grafik\")",
    terms: [
      { tr: "aşırı öğrenme", en: "overfitting" },
      { tr: "yetersiz öğrenme", en: "underfitting" },
      { tr: "dropout", en: "dropout" },
      { tr: "düzenlileştirme", en: "regularization" },
    ],
    task: "Bir loss grafiğine bakıp \"bu overfitting mi, underfitting mi, ideal mi?\" tahmin egzersizi",
  },
  {
    order: 18,
    slug: "transfer-learning",
    title: "Transfer Learning",
    shortTitle: "Transfer Learning",
    goal: "Hazır (pretrained) modelleri kendi veri setine uyarlama mantığını kavrama",
    mainPath: [
      {
        title: "Pretrained model nedir",
        desc: "Büyük bir veri setinde önceden eğitilmiş, hazır ağırlıklara sahip model.",
        detail:
          "Örneğin ImageNet gibi milyonlarca görüntü içeren büyük bir veri setinde eğitilmiş bir modelin ağırlıkları, kenar/doku/şekil gibi genel görsel özellikleri tanımayı zaten öğrenmiştir; bu ağırlıkları sıfırdan başlamak yerine başlangıç noktası olarak kullanmak, çok daha az veriyle ve çok daha hızlı iyi sonuç almanı sağlar.",
      },
      {
        title: "Fine-tuning mantığı",
        desc: "Hazır bir modeli, kendi (genelde daha küçük) veri setiyle yeniden eğiterek uyarlama.",
        detail:
          "Fine-tuning'de pretrained modelin ağırlıkları rastgele değerlerle değil, önceden öğrenilmiş değerlerle başlatılır ve model kendi (genelde çok daha küçük) veri setinle, genelde daha düşük bir learning rate kullanılarak yeniden eğitilir — böylece model genel bilgisini büyük ölçüde korurken kendi problemine özelleşir.",
      },
    ],
    branches: [
      {
        title: "Hangi katmanlar dondurulur (freeze), hangileri yeniden eğitilir",
        desc:
          "İleri seviye. İlk katmanlar genelde kenar/doku gibi çok genel özellikler öğrendiği için genelde dondurulur (freeze) yani eğitim sırasında güncellenmez; son katmanlar ise probleme özel, daha soyut kararlar verdiği için (örn. \"bu bir Toyota mı Renault mu\") yeniden eğitilir. Veri setin ne kadar büyük ve orijinal veri setine ne kadar benzerse, o kadar fazla katmanı yeniden eğitmek mantıklı olur.",
      },
    ],
    visual: "COCO'da eğitilmiş YOLO'nun \"trafik levhası\" veri setiyle yeniden eğitilme akışı",
    terms: [
      { tr: "transfer öğrenme", en: "transfer learning" },
      { tr: "önceden eğitilmiş model", en: "pretrained model" },
      { tr: "ince ayar", en: "fine-tuning" },
      { tr: "katman dondurma", en: "freeze layers" },
    ],
    task: "\"Sıfırdan eğitim mi, transfer learning mi daha mantıklı?\" senaryo bazlı karar egzersizi",
  },
  {
    order: 19,
    slug: "buyuk-veri-kavramlari",
    title: "Büyük Veri Kavramları",
    shortTitle: "Büyük Veri",
    goal: "Büyük ölçekli veri işleme kavramlarına (pipeline, ETL, dağıtık eğitim) aşinalık kazanma",
    mainPath: [
      {
        title: "Data pipeline",
        desc: "Verinin kaynağından işlenip kullanılabilir hale gelene kadar geçtiği otomatik adımlar zinciri.",
        detail:
          "Bir data pipeline, verinin ham kaynağından (örn. bir sensör, API veya veritabanı) alınıp, temizlenip, dönüştürülüp, sonunda model eğitimi veya raporlama için kullanılabilir hale gelene kadar geçtiği otomatikleştirilmiş adımlar zinciridir. İyi tasarlanmış bir pipeline, yeni veri geldiğinde bu adımların elle tekrar yapılmasına gerek bırakmaz.",
      },
      {
        title: "ETL",
        desc: "Extract (çıkarma), Transform (dönüştürme), Load (yükleme) adımlarından oluşan klasik veri işleme süreci.",
        detail:
          "Extract adımında veri farklı kaynaklardan (dosyalar, API'ler, veritabanları) çekilir; Transform adımında veri temizlenir, birleştirilir ve istenen formata dönüştürülür; Load adımında ise işlenmiş veri hedef bir depoya (veritabanı, data warehouse) yazılır. Bu üç adım, büyük ölçekli veri işlemenin klasik ve hâlâ en yaygın çerçevesidir.",
      },
      {
        title: "Data warehouse vs Data lake",
        desc: "Yapılandırılmış, analiz için hazır veri deposu ile ham/karma veriyi olduğu gibi tutan depo arasındaki fark.",
        detail:
          "Data warehouse, önceden tanımlanmış bir şemaya göre temizlenmiş, yapılandırılmış veriyi tutar ve genelde SQL sorgularıyla analiz için optimize edilmiştir; data lake ise ham, yapılandırılmış veya yapılandırılmamış her türlü veriyi olduğu gibi (schema-on-read) saklar, bu da daha esnek ama daha az düzenli bir yapı sunar.",
      },
    ],
    branches: [
      {
        title: "Distributed training mantığı",
        desc:
          "Spark/Hadoop ile veri, çoklu GPU ile model paralelliği. Data parallelism'de aynı model birden fazla GPU'ya kopyalanır, her GPU veri setinin farklı bir batch'ini işler ve gradyanlar sonunda birleştirilir; model parallelism'de ise tek bir modelin farklı katmanları/parçaları farklı GPU'lara dağıtılır — genelde model, tek bir GPU'nun belleğine sığmayacak kadar büyük olduğunda tercih edilir.",
      },
    ],
    visual: "ETL akış şeması (Extract → Transform → Load); data warehouse vs data lake karşılaştırma tablosu",
    terms: [
      { tr: "veri hattı", en: "data pipeline" },
      { tr: "çıkar-dönüştür-yükle", en: "ETL" },
      { tr: "veri ambarı", en: "data warehouse" },
      { tr: "veri gölü", en: "data lake" },
      { tr: "dağıtık eğitim", en: "distributed training" },
    ],
    task: "Basit bir ETL senaryosunu adım adım (kaynak veri → temizleme → hedef tabloya yazma) takip etme",
  },
  {
    order: 20,
    slug: "mlops",
    title: "MLOps",
    shortTitle: "MLOps",
    goal: "Bir modelin nasıl production'a alınıp izlendiğini kavrama",
    mainPath: [
      {
        title: "Model deployment",
        desc: "Eğitilen modelin bir API/servis haline getirilip (Flask/FastAPI → Docker → Kubernetes) gerçek kullanıcılara sunulması.",
        detail:
          "Eğitilen bir model, genelde önce Flask/FastAPI gibi bir framework ile bir API endpoint'i haline getirilir (örn. `/predict` adresine görüntü gönderince tahmin dönmesi), sonra bu API bir Docker container'ına paketlenerek her ortamda aynı şekilde çalışması garanti altına alınır, son olarak Kubernetes gibi bir orkestrasyon aracıyla ölçeklenip gerçek kullanıcı trafiğine açılır.",
      },
      {
        title: "Model tracking",
        desc: "Farklı deney, model versiyonu ve metriklerin (MLflow/W&B ile) sistematik olarak kaydedilip karşılaştırılması.",
        detail:
          "MLflow veya Weights & Biases gibi araçlar, her eğitim denemesinin hangi hiperparametrelerle yapıldığını, hangi metrikleri (loss, mAP vb.) verdiğini ve hangi model dosyasını ürettiğini otomatik olarak kaydeder; bu, \"hangi denemede en iyi sonucu almıştım?\" sorusuna aylar sonra bile kolayca cevap bulmanı sağlar.",
      },
    ],
    branches: [
      {
        title: "Model optimization (Quantization, Pruning, ONNX, TensorRT)",
        desc:
          "Donanım kısıtlı ortamlar için. Quantization, model ağırlıklarını 32-bit yerine 8-bit gibi daha düşük hassasiyetle temsil ederek modeli küçültür ve hızlandırır (küçük bir doğruluk kaybı pahasına); pruning, modelin çok az katkı sağlayan bağlantılarını/nöronlarını tamamen kaldırır; ONNX ve TensorRT gibi araçlar ise modeli belirli donanımlarda (özellikle NVIDIA GPU'larda, edge cihazlarda) daha hızlı çalışacak şekilde optimize eder — bu üçü birlikte, bir modeli örneğin bir arabanın içindeki düşük güçlü bir çipte çalıştırılabilir hale getirir.",
      },
    ],
    visual: "Model yaşam döngüsü şeması (eğitim → paketleme → deploy → izleme → yeniden eğitim döngüsü)",
    terms: [
      { tr: "dağıtım", en: "deployment" },
      { tr: "konteynerleştirme", en: "containerization" },
      { tr: "model izleme", en: "model tracking" },
      { tr: "niceleme", en: "quantization" },
      { tr: "budama", en: "pruning" },
    ],
    task: "Basit bir FastAPI endpoint'inin bir modeli nasıl serve ettiğini gösteren kod akışı (kavramsal, kod yazdırmadan)",
  },
  {
    order: 21,
    slug: "veri-seti-kaynaklari",
    title: "Veri Seti Kaynakları",
    shortTitle: "Veri Kaynakları",
    goal: "Hangi platformdan hangi tür veri setinin bulunacağını bilme",
    mainPath: [
      {
        title: "Kaggle",
        desc: "Veri seti, yarışma ve topluluk çözümleri barındıran en yaygın platform.",
        detail:
          "Kaggle, veri setlerinin yanı sıra yarışmalar ve diğer kullanıcıların paylaştığı çözüm notebook'larını (kernel) da barındırır; bu notebook'lar, bir problemi başkalarının nasıl çözdüğünü görmek için harika bir kaynaktır.",
      },
      {
        title: "Roboflow Universe",
        desc: "Computer vision'a özel, hazır etiketlenmiş veri setleri sunan platform.",
        detail:
          "Roboflow Universe, halihazırda annotate edilmiş binlerce computer vision veri setini (çoğu YOLO formatında, doğrudan indirilebilir) barındırır; kendi veri setini toplamadan önce benzer bir problem için hazır bir veri seti olup olmadığını kontrol etmek zaman kazandırır.",
      },
      {
        title: "COCO",
        desc: "Nesne tespiti/segmentasyon için standart, geniş kapsamlı benchmark veri seti.",
        detail:
          "COCO (Common Objects in Context), 80 farklı sınıfta 200.000'den fazla etiketli görüntü içeren, object detection/segmentation modellerinin karşılaştırılmasında endüstri standardı haline gelmiş bir benchmark'tır; çoğu pretrained model (YOLO dahil) önce COCO üzerinde eğitilir.",
      },
      {
        title: "ImageNet",
        desc: "Görüntü sınıflandırma alanının temel referans veri seti.",
        detail:
          "ImageNet, 1000'den fazla kategoride 14 milyondan fazla etiketli görüntü içerir; 2012'de AlexNet'in bu veri setinde gösterdiği başarı, derin öğrenmenin computer vision'da patlama yapmasını tetikleyen dönüm noktalarından biri olmuştur.",
      },
      {
        title: "Open Images",
        desc: "Google tarafından sağlanan, geniş kapsamlı etiketli görüntü veri seti.",
        detail:
          "Open Images, hem sınıflandırma hem detection hem segmentation etiketleri içeren, ImageNet'ten bile daha geniş kapsamlı (9 milyondan fazla görüntü) bir veri setidir ve Google tarafından ücretsiz olarak sağlanır.",
      },
      {
        title: "UCI",
        desc: "Klasik makine öğrenmesi problemleri için küçük/orta ölçekli veri setleri arşivi.",
        detail:
          "UCI Machine Learning Repository, genelde görüntü değil tablo (structured) veri içeren, küçük/orta ölçekli ama iyi belgelenmiş klasik veri setleri barındırır — regresyon/sınıflandırma algoritmalarını ilk kez denerken sıkça kullanılan bir kaynaktır.",
      },
      {
        title: "Hugging Face",
        desc: "Model ve veri setlerinin birlikte paylaşıldığı, NLP kökenli ama artık CV'yi de kapsayan platform.",
        detail:
          "Hugging Face, başlangıçta NLP modelleri için popülerleşse de artık computer vision, ses ve multimodal modelleri ile veri setlerini de aynı platformda barındırıyor; hem hazır model ağırlıklarını hem de veri setlerini `datasets` ve `transformers` kütüphaneleriyle tek bir yerden kolayca indirebilirsin.",
      },
    ],
    branches: [
      {
        title: "Kendi veri setini nasıl toplayıp Roboflow'a yükleyeceği",
        desc:
          "Annotation pipeline'ına köprü — Bölüm 13. Kendi fotoğraflarını (örn. kendi çektiğin araç fotoğrafları) Roboflow'a yükleyip web arayüzünden bounding box çizerek etiketleyebilir, ardından tek tıkla istediğin formatta (YOLO, COCO, VOC) ve otomatik augmentation uygulanmış olarak dışa aktarabilirsin.",
      },
    ],
    visual: "Platformların \"hangi görev için en uygun\" olduğunu gösteren karşılaştırma tablosu",
    terms: [
      { tr: "açık veri seti", en: "open dataset" },
      { tr: "kıyaslama veri seti", en: "benchmark dataset" },
      { tr: "veri seti deposu", en: "dataset repository" },
    ],
    task: "\"Elimde X problemi var, hangi platformda veri ararım?\" senaryo eşleştirme egzersizi",
    bridges: [{ toSlug: "yolo-ekosistemi", label: "Annotation pipeline → YOLO Ekosistemi (Bölüm 13)" }],
  },
  {
    order: 22,
    slug: "ai-engineer-yol-haritasi",
    title: "Profesyonel Bir AI Engineer Yol Haritası",
    shortTitle: "Yol Haritası",
    goal: "Tüm bölümlerin birbirine nasıl bağlandığını gören büyük resmi kavrama",
    mainPath: [
      {
        title: "Python → NumPy/Pandas → Matematik → ML → Deep Learning → PyTorch → CNN → OpenCV → YOLO → Veri Hazırlama → Model Eğitme → MLOps → Deployment",
        desc: "Bu müfredattaki tüm modüllerin, bir AI Engineer'ın gerçek iş akışında hangi sırayla bir araya geldiğinin özeti.",
        detail:
          "Bu sıralama rastgele değildir: Python ve matematik temelleri olmadan ML algoritmalarının neden çalıştığını anlamak zorlaşır; ML temelleri olmadan deep learning'in neden gerekli olduğunu kavramak zorlaşır; CNN/OpenCV temelleri olmadan YOLO'nun mimarisini anlamlandırmak zorlaşır. Gerçek bir AI Engineer, genelde bu sırayı büyük ölçüde takip ederek uzmanlaşır, sonra kariyerinde belirli bir alana (örn. object detection, MLOps) derinlemesine yönelir.",
      },
    ],
    branches: [],
    visual:
      "Tıklanabilir, interaktif bir akış şeması: her kutu ilgili bölüme link verir (bu sayfanın kendisi — ana sayfadaki şema).",
    terms: [],
    task: "Kullanıcının kendi ilerleme durumunu işaretleyebileceği bir checklist/roadmap widget'ı",
  },
];

export function findModuleBySlug(slug: string) {
  for (const mod of curriculum) {
    if (mod.slug === slug) return { type: "module" as const, module: mod };
    if (mod.subModules) {
      const sub = mod.subModules.find((s) => s.slug === slug);
      if (sub) return { type: "sub" as const, module: mod, sub };
    }
  }
  return null;
}

export function allTerms(): Term[] {
  const terms: Term[] = [];
  for (const mod of curriculum) {
    if (mod.terms) terms.push(...mod.terms);
    if (mod.subModules) {
      for (const sub of mod.subModules) terms.push(...sub.terms);
    }
  }
  // slugify + dedupe by EN term
  const seen = new Set<string>();
  return terms.filter((t) => {
    const key = t.en.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
