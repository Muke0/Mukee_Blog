# 青训营作业
## Go语言的实战案例
课程链接
https://juejin.cn/course/bytetech/7140987981803814919/section/7141265019756675103
### 1
修改第一个例子猜谜游戏里面的最终稿代码，使用fmt.Scanf来简化代码实现
```go
package main

import (
	//"bufio"
	"fmt"
	"math/rand"
	//"os"
	"strconv"
	//"strings"
	"time"
)

func main() {
	maxNum := 100
	rand.Seed(time.Now().UnixNano())
	secretNumber := rand.Intn(maxNum)
	// fmt.Println("The secret number is ", secretNumber)

	fmt.Println("Please input your guess")
	//reader := bufio.NewReader(os.Stdin)
	
	for {
		var input=" "
		fmt.Scanf("%v",&input)
		// if err != nil {
		// 	fmt.Println("An error occured while reading input. Please try again", err)
		// 	continue
		// }

		guess, err := strconv.Atoi(input)
		if err != nil {
			fmt.Println("Invalid input. Please enter an integer value")
			continue
		}
		fmt.Println("You guess is", guess)
		if guess > secretNumber {
			fmt.Println("Your guess is bigger than the secret number. Please try again")
		} else if guess < secretNumber {
			fmt.Println("Your guess is smaller than the secret number. Please try again")
		} else {
			fmt.Println("Correct, you Legend!")
			break
		}
	}
}

```
### 2
修改第二个例子命令行词典里面的最终代码，增加另一种翻译引擎的支持
先通过浏览器开发者工具中的网络找到发出的请求
![dict_1](/1dev/go/dict_1.png "dict_1")
https://curlconverter.com/#go
通过该网址生成发请求的代码
![dict_2](/1dev/go/dict_2.png "dict_2")
```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type DictRequest1 struct {
	TransType string `json:"trans_type"`
	Source    string `json:"source"`
	UserID    string `json:"user_id"`
}

type DictRequest2 struct {
	From  string `json:"from"`
	To    string `json:"to"`
	Text  string `json:"text"`
	Token string `json:"token"`
	Key   string `json:"key"`
}

type DictResponse1 struct {
	Rc   int `json:"rc"`
	Wiki struct {
		KnownInLaguages int `json:"known_in_laguages"`
		Description     struct {
			Source string      `json:"source"`
			Target interface{} `json:"target"`
		} `json:"description"`
		ID   string `json:"id"`
		Item struct {
			Source string `json:"source"`
			Target string `json:"target"`
		} `json:"item"`
		ImageURL  string `json:"image_url"`
		IsSubject string `json:"is_subject"`
		Sitelink  string `json:"sitelink"`
	} `json:"wiki"`
	Dictionary struct {
		Prons struct {
			EnUs string `json:"en-us"`
			En   string `json:"en"`
		} `json:"prons"`
		Explanations []string      `json:"explanations"`
		Synonym      []string      `json:"synonym"`
		Antonym      []string      `json:"antonym"`
		WqxExample   [][]string    `json:"wqx_example"`
		Entry        string        `json:"entry"`
		Type         string        `json:"type"`
		Related      []interface{} `json:"related"`
		Source       string        `json:"source"`
	} `json:"dictionary"`
}

func query1(word string) {
	client := &http.Client{}
	request := DictRequest1{TransType: "en2zh", Source: word}
	fmt.Println(request)
	buf, err := json.Marshal(request)
	if err != nil {
		log.Fatal(err)
	}
	var data = bytes.NewReader(buf)
	req, err := http.NewRequest("POST", "https://api.interpreter.caiyunai.com/v1/dict", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("DNT", "1")
	req.Header.Set("os-version", "")
	req.Header.Set("sec-ch-ua-mobile", "?0")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36")
	req.Header.Set("app-name", "xy")
	req.Header.Set("Content-Type", "application/json;charset=UTF-8")
	req.Header.Set("Accept", "application/json, text/plain, */*")
	req.Header.Set("device-id", "")
	req.Header.Set("os-type", "web")
	req.Header.Set("X-Authorization", "token:qgemv4jr1y38jyq6vhvi")
	req.Header.Set("Origin", "https://fanyi.caiyunapp.com")
	req.Header.Set("Sec-Fetch-Site", "cross-site")
	req.Header.Set("Sec-Fetch-Mode", "cors")
	req.Header.Set("Sec-Fetch-Dest", "empty")
	req.Header.Set("Referer", "https://fanyi.caiyunapp.com/")
	req.Header.Set("Accept-Language", "zh-CN,zh;q=0.9")
	req.Header.Set("Cookie", "_ym_uid=16456948721020430059; _ym_d=1645694872")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != 200 {
		log.Fatal("bad StatusCode:", resp.StatusCode, "body", string(bodyText))
	}
	var dictResponse DictResponse1
	err = json.Unmarshal(bodyText, &dictResponse)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(word, "UK:", dictResponse.Dictionary.Prons.En, "US:", dictResponse.Dictionary.Prons.EnUs)
	for _, item := range dictResponse.Dictionary.Explanations {
		fmt.Println(item)
	}
}

func query2(word string) {
	client := &http.Client{}
	request := DictRequest2{From: "en", To: "zh-Hans", Text: word, Token: "q0EWYBdnTA0KzJ-m4KV1XT2s_J961GbU", Key: "1685453219672"}
	buf, err := json.Marshal(request)
	if err != nil {
		log.Fatal(err)
	}
	var data = bytes.NewReader(buf)
	req, err := http.NewRequest("POST", "https://cn.bing.com/tlookupv3?&IG=AA0E0902D3CE42BFBB117EF32ED65021&IID=SERP.5719.2", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("authority", "cn.bing.com")
	req.Header.Set("accept", "*/*")
	req.Header.Set("accept-language", "zh-CN,zh;q=0.9,en;q=0.8")
	req.Header.Set("content-type", "application/x-www-form-urlencoded")
	req.Header.Set("cookie", "_EDGE_V=1; MUID=1FDA97E3702162F03691850271F36361; MUIDB=1FDA97E3702162F03691850271F36361; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=284CFFF9D25444A8A203141E6C3EFDD3&dmnchg=1; _UR=QS=0&TQS=0; MicrosoftApplicationsTelemetryDeviceId=40be96d8-1f1d-4eb7-8af1-aed7e2c10789; ANIMIA=FRE=1; _tarLang=default=zh-Hans; _TTSS_IN=hist=WyJlbiIsImF1dG8tZGV0ZWN0Il0=; _TTSS_OUT=hist=WyJ6aC1IYW5zIl0=; MMCASM=ID=83B621A2401242048F0C33EFBD684A61; SUID=M; _EDGE_S=SID=0BED0A1C8AD6683C2975193D8BF8697C; _SS=SID=0BED0A1C8AD6683C2975193D8BF8697C&R=200&RB=0&GB=0&RG=200&RP=200; USRLOC=HS=1&ELOC=LAT=30.323652267456055|LON=120.34452056884766|N=%E9%92%B1%E5%A1%98%E5%8C%BA%EF%BC%8C%E6%B5%99%E6%B1%9F%E7%9C%81|ELT=6|; SRCHUSR=DOB=20230513&T=1685449656000&TPC=1685410401000; ipv6=hit=1685453257842&t=4; SNRHOP=I=&TS=; _HPVN=CS=eyJQbiI6eyJDbiI6MTYsIlN0IjowLCJRcyI6MCwiUHJvZCI6IlAifSwiU2MiOnsiQ24iOjE2LCJTdCI6MCwiUXMiOjAsIlByb2QiOiJIIn0sIlF6Ijp7IkNuIjoxNiwiU3QiOjAsIlFzIjowLCJQcm9kIjoiVCJ9LCJBcCI6dHJ1ZSwiTXV0ZSI6dHJ1ZSwiTGFkIjoiMjAyMy0wNS0zMFQwMDowMDowMFoiLCJJb3RkIjowLCJHd2IiOjAsIkRmdCI6bnVsbCwiTXZzIjowLCJGbHQiOjAsIkltcCI6MTMwfQ==; ai_session=1KhycIHjj/07GllrLJJoHZ|1685449657718|1685451492916; ABDEF=V=13&ABDV=13&MRNB=1685453220493&MRB=0; _RwBf=ilt=322&ihpd=8&ispd=20&rc=200&rb=0&gb=0&rg=200&pc=200&mtu=0&rbb=0&g=0&cid=&clo=0&v=28&l=2023-05-30T07:00:00.0000000Z&lft=2023-05-23T00:00:00.0000000-07:00&aof=0&o=2&p=&c=&t=0&s=0001-01-01T00:00:00.0000000+00:00&ts=2023-05-30T13:27:00.4714114+00:00&rwred=0&wls=&lka=0&lkt=0&TH=; btstkn=cEFSkep4Xu6KV3eCZWx71qJtqckdBfVN7KUva0OOnhrw2QE%252BDUnJQWTPzHfukLMSIPfccrl0DhBpoSsRvx2PvzodlcOPj9WAlUPsV7lpOAg%253D; SRCHHPGUSR=SRCHLANG=zh-Hans&BZA=0&BRW=NOTP&BRH=S&CW=398&CH=615&SCW=1164&SCH=3885&DPR=1.5&UTC=480&DM=0&PV=15.0.0&HV=1685453221&WTS=63821046596&PRVCW=1280&PRVCH=615")
	req.Header.Set("origin", "https://cn.bing.com")
	req.Header.Set("referer", "https://cn.bing.com/search?q=%E8%B0%B7%E6%AD%8C%E7%BF%BB%E8%AF%91&qs=n&form=QBRE&sp=-1&lq=0&pq=%E8%B0%B7%E6%AD%8C%E7%BF%BB%E8%AF%91&sc=10-4&sk=&cvid=BD6EDC2E17F54CBCBB0CD0D84B65A2CD&ghsh=0&ghacc=0&ghpl=")
	req.Header.Set("sec-ch-ua", `"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"`)
	req.Header.Set("sec-ch-ua-arch", `"x86"`)
	req.Header.Set("sec-ch-ua-bitness", `"64"`)
	req.Header.Set("sec-ch-ua-full-version", `"113.0.5672.127"`)
	req.Header.Set("sec-ch-ua-full-version-list", `"Google Chrome";v="113.0.5672.127", "Chromium";v="113.0.5672.127", "Not-A.Brand";v="24.0.0.0"`)
	req.Header.Set("sec-ch-ua-mobile", "?0")
	req.Header.Set("sec-ch-ua-model", `""`)
	req.Header.Set("sec-ch-ua-platform", `"Windows"`)
	req.Header.Set("sec-ch-ua-platform-version", `"15.0.0"`)
	req.Header.Set("sec-fetch-dest", "empty")
	req.Header.Set("sec-fetch-mode", "cors")
	req.Header.Set("sec-fetch-site", "same-origin")
	req.Header.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", bodyText)
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, `usage: simpleDict WORD
example: simpleDict hello
		`)
		os.Exit(1)
	}
	word := os.Args[1]
	query2(word)
}

```
谷歌翻译请求没有通过token鉴权，返回205状态码
火山翻译无响应
放弃