# less basic

전처리 스타일시트 언어

## 변수

input

```sh
@width: 10px;
@height: @width + 10px; // 연산자 가능

#header {
   width: @width;
   height: @height;
}
```

output

```sh
#header {
   width: 10px;
   height: 20px;
}
```

## Mixins

input

```sh
.bordered {
   border-top: dotted 1px black;
   border-bottom: solid 2px black;
}
```

output

```sh
#menu a {
   color: #111;
   .bordered();
}

.post a {
   color: red;
   .bordered();
}
```

## 중첩(Nesting)

input

```sh
#header {
   color: black;
   .navigation {
      font-size: 12px;
   }
   .logo {
      width: 300px;
      &:hover {
         color: white;
      }
      &:before {
         display: block;
         content: "";
      }
   }
}
```

output

```sh
#header {
   color: black;
}
#header .navigation {
   font-size: 12px;
}
#header .logo {
   width: 300px;
}
#header .logo:hover {
   color: white;
}
#header .logo:before {
   display: block;
   content: "";
}
```

## 연산

```sh
// 숫자들은 동일한 단위로 변환된다.
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm
// 변수로 쓴 예제
@base: 5%;
@filler: @base * 2; // 10% 
@other: @base + @filler; // 15%
```
