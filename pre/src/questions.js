export const questionSection = new Binder();

const frequencies = ['Rarely', 'Seldom', 'Occasionally', 'Moderately', 'Frequently', 'Generally', 'Usually', 'Extremely'];

let questions = [];

DOM.requestJSON('test.json', data => {
  questions = data.questions; 
  data.questions.forEach(q => {
    q.answers = [];
    q.model = {
      h1: {
        marginTop: '1.5em',
        fontSize: '1.5em',
        text: q.question
      },
      div: q.options.map(o => {
        var isVS = Array.isArray(o);
        if (!isVS) o = [o];
        var answer = new Binder(50);
        q.answers.push(answer);
        return {
          backgroundColor: 'white',
          margin: '1px 0',
          padding: '0.68em',
          position: 'relative',
          color: 'black',
          div: {
            margin: '0 1em',
            display: 'flex',
            flexDirection: 'row',
            placeContent: 'space-evenly',
            div: o.map((option, i) => new Object({
              h2: {
                fontSize: isVS ? '1.34em' : '1.5em',
                marginTop: '0.5em',
                fontWeight: 'bold',
                text: option.choice
              },
              p: {
                fontSize: 'small',
                color: 'lightslategray',
                text: option.hint
              }
            }))
          },
          input: {
            display: 'block',
            width: '100%',
            type: 'range',
            min: 1,
            max: 99,
            value: answer.bind(),
            oninput: e => {
              var v = parseInt(e.target.value);
              answer.value = q.reverse ? 100 - v : v;
              update();
            }
          },
          i: {
            fontSize: 'small',
            color: '#06c',
            bottom: '2.5em',
            position: 'absolute',
            pointerEvents: 'none',
            margin: '0 1em',
            content: [{
              right: 0,
              text: isVS ? '- - - >' : answer.bind(v => v + '%')
            }, {
              left: 0,
              text: isVS ? '< - - -' : answer.bind(v => frequencies[Math.floor(v * frequencies.length / 100)])
            }]
          }
        }
      })
    }
  });

  questionSection.value = {
    maxWidth: '45em',
    margin: '0 auto',
    textShadow: 'none',
    content: data.questions.map((q, i) => new Object({
      h1: {
        marginTop: '1.5em',
        text: !i ? 'Sample' : i === 1 ? 'Start' : i === (data.questions.length - 1) ? 'Done' : undefined
      },
      article: q.model
    }))
  };

});