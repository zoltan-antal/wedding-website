import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import './Schedule.css';

interface Event {
  time: string;
  text: string;
}

interface DayEvents {
  day: string;
  events: Event[];
}

const Schedule = () => {
  const { language, mainRef, navWidth } = useOutletContext<Context>();

  const timelineData: DayEvents[] = [
    {
      day: { English: 'Friday', Hungarian: 'Péntek' }[language],
      events: [
        {
          time: { English: '2:30 pm', Hungarian: '14:30' }[language],
          text:
            { English: 'Meet & Greet', Hungarian: 'Ismerkedős délután' }[
              language
            ] + ' 🙋',
        },
      ],
    },
    {
      day: { English: 'Saturday', Hungarian: 'Szombat' }[language],
      events: [
        {
          time: { English: '2:30 - 3 pm', Hungarian: '14:30-15:00' }[language],
          text:
            {
              English: 'Arrival to venue',
              Hungarian: 'Érkezés a helyszínre',
            }[language] + ' 🚗',
        },
        {
          time: { English: '3:30 pm', Hungarian: '15:30' }[language],
          text:
            {
              English: 'Ceremony',
              Hungarian: 'Ceremónia',
            }[language] + ' 💍',
        },
        {
          time: { English: '4:15 pm', Hungarian: '16:15' }[language],
          text:
            {
              English: 'Toast and cake',
              Hungarian: 'Koccintás és torta',
            }[language] + ' 🥂',
        },
        {
          time: { English: '4:45 pm', Hungarian: '16:45' }[language],
          text:
            {
              English: 'Photos',
              Hungarian: 'Fotózkodás',
            }[language] + ' 📸',
        },
        {
          time: { English: '6 pm', Hungarian: '18:00' }[language],
          text:
            {
              English: 'First dance',
              Hungarian: 'Nyitótánc',
            }[language] + ' 💃',
        },
        {
          time: { English: '6:30 pm', Hungarian: '18:30' }[language],
          text:
            {
              English: 'Dinner',
              Hungarian: 'Vacsora',
            }[language] + ' 🍽️',
        },
        {
          time: { English: '10 pm', Hungarian: '22:00' }[language],
          text:
            {
              English: 'Dancing and more fun',
              Hungarian: 'Tánc és még több vidámság',
            }[language] + ' 🎉',
        },
        {
          time: { English: '11:30 pm', Hungarian: '23:30' }[language],
          text:
            {
              English: 'Midnight buffet',
              Hungarian: 'Éjféli büfé',
            }[language] + ' 🍕',
        },
      ],
    },
    {
      day: { English: 'Sunday', Hungarian: 'Vasárnap' }[language],
      events: [
        {
          time: { English: 'morning', Hungarian: 'reggel' }[language],
          text:
            { English: 'Breakfast', Hungarian: 'Reggeli' }[language] + ' 🥐',
        },
        {
          time: { English: 'by 2 pm', Hungarian: '14:00-ig' }[language],
          text:
            { English: 'Leave venue', Hungarian: 'Helyszín elhagyása' }[
              language
            ] + ' 🚗',
        },
      ],
    },
    {
      day: { English: 'Monday', Hungarian: 'Hétfő' }[language],
      events: [
        {
          time: { English: '10:15 am', Hungarian: '10:15' }[language],
          text:
            {
              English: 'Travel to Balatonfüred',
              Hungarian: 'Utazás a Balatonfüredre',
            }[language] + ' 🚆',
        },
        {
          time: { English: '2 pm', Hungarian: '14:00' }[language],
          text:
            {
              English: 'Chilling at the beach',
              Hungarian: 'Strandolás',
            }[language] + ' 🏖️',
        },
        {
          time: { English: '8 pm', Hungarian: '20:00' }[language],
          text:
            {
              English: 'BBQ',
              Hungarian: 'Sütögetés',
            }[language] + ' 🍖',
        },
      ],
    },
    {
      day: { English: 'Tuesday', Hungarian: 'Kedd' }[language],
      events: [
        {
          time: { English: '10 am', Hungarian: '10:00' }[language],
          text:
            {
              English: 'Travel to Balatonfűzfő',
              Hungarian: 'Utazás a Balatonfűzfőre',
            }[language] + ' 🚆',
        },
        {
          time: { English: '11:15 am', Hungarian: '11:15' }[language],
          text:
            {
              English: 'Mountain coaster',
              Hungarian: 'Bobozás',
            }[language] + ' 🎢',
        },
        {
          time: { English: '1:30 pm', Hungarian: '13:30' }[language],
          text:
            {
              English: 'Chilling at the beach',
              Hungarian: 'Strandolás',
            }[language] + ' 🏖️',
        },
        {
          time: { English: '5 pm', Hungarian: '17:00' }[language],
          text:
            {
              English: 'Travel back to Budapest',
              Hungarian: 'Visszautazás Budapestre',
            }[language] + ' 🚆',
        },
      ],
    },
  ];

  return (
    <main ref={mainRef} style={{ width: `${navWidth}px` }} id="schedule-page">
      <h1>
        {
          {
            English: 'Schedule',
            Hungarian: 'Program',
          }[language]
        }
      </h1>
      <div className="timeline">
        {timelineData.map((dayData, dayIndex) => (
          <div key={dayIndex} className="day-section">
            <h3 className="day-title">{dayData.day}</h3>
            {dayData.events.map((event, index) => (
              <div className="timeline-item" key={index}>
                <div className="time-label">{event.time}</div>
                <div className="timeline-content">{event.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Schedule;
