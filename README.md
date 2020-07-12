# Food Lunch App Food Delivery for iOS & Android (เขียนไว้นานแล้วนะครับ เลยยังไม่ได้ใช้เป็น React Hooks)


## การติดตั้ง

เปิด Terminal หรือ CMD:

```sh
git clone git@github.com:Saharak-Dove/FoodLunch.git
```

รอจนเสร็จ และใช้คำสั่ง:

```sh
cd FoodLunch
```

ทำการติดตั้ง Package โดยใช้คำสั่ง:

```sh
yarn install
```

หรือ

```sh
ืnpm install
```

สำหรับ iOS ให้

```sh
cd ios && pod install
```

## ติดตั้งแอป

สำหรับ iOS

```sh
react-native run-ios
```

สำหรับ Android

```sh
react-native run-android
```

## ติดตั้งแอปบนเครื่องสำหรับทดสอบหรือ Release

สำหรับเทสบนเครื่อง iOS แบบโหมด Debug

```sh
react-native run-ios --device --configuration Debug
```

สำหรับเทสบนเครื่อง iOS แบบโหมด Release

```sh
react-native run-ios --device --configuration Release
```

สำหรับเทสบนเครื่อง Android แบบโหมด Debug

```sh
react-native run-android
```

สำหรับเทสบนเครื่อง Android แบบโหมด Release

```sh
react-native run-android --variant=release
```
