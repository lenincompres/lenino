let control = new BinderSet({
  s1: true,
  s2: true,
  s3: true,
  name: '',
});

DOM.set({
  //backgroundColor: Binder.with(control._s1, control._s2, control._s3).as((s1, s2, s3) => ["maroon", "chocolate", "orange", "limegreen"][(s1 ? 1 :0) + (s2 ? 1 :0) + (s3 ? 1 :0)]),
  div: {
    padding: '1em',
    margin: "1em",
    content: [{
      backgroundColor: control.with("s1").as("red", "lime"),
      p: control._s1,
      onclick(e) {
        control.s1 = !control.s1;
        control.name += "<p>1 clicked</p>";
      },
    }, {
      backgroundColor: {
        with: control._s2,
        as: {
          false: "red",
          true: "lime"
        }
      },
      p: control.with("s2"),
      onclick(e) {
        control.s2 = !control.s2;
        control.name += "<p>2 clicked</p>";
      },
    }, {
      backgroundColor: {
        with: control._s3, 
        as: ["red", "lime"],
      },
      p: control.bind({
        with: "s3",
      }),
      onclick(e) {
        control.s3 = !control.s3;
        control.name += "<p>3 clicked</p>";
      },
    }]
  },
  p: control.bind({
    with: ["s2", "s3"],
    as: (s2, s3) => `${s2} === ${s3}: ${s2 === s3}`,
  }),
  footer: control._name,
});

//document.body.bind("backgroundColor").with(control._s1, control._s2, control._s3).as((s1, s2, s3) => ["maroon", "chocolate", "orange", "limegreen"][(s1 ? 1 : 0) + (s2 ? 1 : 0) + (s3 ? 1 : 0)]);

control.bind(document.body, "backgroundColor").with("s1", "s2", "s3").as((s1, s2, s3) => ["maroon", "chocolate", "orange", "limegreen"][(s1 ? 1 : 0) + (s2 ? 1 : 0) + (s3 ? 1 : 0)]);

control.bind({
  target: document.body,
  station: "backgroundColor",
  with: ["s1", "s2", "s3"],
  as: (s1, s2, s3) => ["maroon", "chocolate", "orange", "limegreen"][(s1 ? 1 : 0) + (s2 ? 1 : 0) + (s3 ? 1 : 0)],
});