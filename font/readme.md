# divino anticristo font

Generate svgs

```
for f in *.png; do
  base="${f%.png}"
  bmp=$(mktemp --suffix=.bmp)
  magick "$f" -threshold 60% "$bmp"
  potrace -s "$bmp" -o "../vectors/$base.svg"
  rm "$bmp"
done
```


```
fontforge -script import_svgs.py
```

# minusc

todas las minusculas (bold) se sacaron de "qué es finalmente la siquiatria"