import { useState } from 'react';
import { useImmer } from 'use-immer';
// import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Context } from '../../types/context';
import RadioCheckbox from './RadioCheckbox';

enum RsvpFormFieldNames {
  GuestsAttending = 'guestsAttending',
  DietaryRequirements = 'dietaryRequirements',
}

interface RsvpFormData {
  [RsvpFormFieldNames.GuestsAttending]: number[];
  [RsvpFormFieldNames.DietaryRequirements]: string;
}

const RsvpForm = () => {
  const { language, household } = useOutletContext<Context>();

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [formData, updateFormData] = useImmer<RsvpFormData>({
    guestsAttending: household?.guests.map((guest) => guest.id) || [],
    dietaryRequirements: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonDisabled(true);
    } catch (error) {
      setButtonDisabled(false);
    }
  };

  return (
    <>
      {household && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              {
                {
                  English: 'Who will be attending?',
                  Hungarian: 'Ki jön?',
                }[language]
              }
            </legend>
            {household.guests
              .toSorted((a, b) => {
                const nameA = a.firstName.toLowerCase();
                const nameB = b.firstName.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              })
              .map((guest) => (
                <RadioCheckbox
                  key={guest.id}
                  checked={formData.guestsAttending.includes(guest.id)}
                  name={`${RsvpFormFieldNames.GuestsAttending}.${guest.id}`}
                  onChange={(e) => {
                    updateFormData((draft) => {
                      if (e.target.value == 'true') {
                        draft.guestsAttending.push(guest.id);
                      } else {
                        draft.guestsAttending = draft.guestsAttending.filter(
                          (guestId) => guestId !== guest.id
                        );
                      }
                    });
                  }}
                  label={guest.firstName}
                  trueLabel={
                    {
                      English: "I'll be there",
                      Hungarian: 'Ott leszek',
                    }[language]
                  }
                  falseLabel={
                    {
                      English: "I can't make it",
                      Hungarian: 'Nem tudok jönni',
                    }[language]
                  }
                ></RadioCheckbox>
              ))}
          </fieldset>
          {!!formData.guestsAttending.length && (
            <>
              <label>
                {
                  {
                    English: `Are there any allergies or dietary requirements that we should be aware of?`,
                    Hungarian: `Bármilyen allergia vagy különleges étrendi követelmény, amiről tudnunk kell?`,
                  }[language]
                }
                <input
                  type="textarea"
                  name={RsvpFormFieldNames.DietaryRequirements}
                  value={formData.dietaryRequirements}
                  onChange={(e) => {
                    updateFormData((draft) => {
                      draft.dietaryRequirements = e.target.value;
                    });
                  }}
                />
              </label>
            </>
          )}
          {!formData.guestsAttending.length && (
            <p>
              {
                {
                  English: "We'll miss you!",
                  Hungarian: `Hiányozni ${
                    household.guests.length > 1 ? 'fogtok' : 'fogsz'
                  }!`,
                }[language]
              }
            </p>
          )}
          <button type="submit" disabled={buttonDisabled}>
            {' '}
            {
              {
                English: 'Submit',
                Hungarian: 'Elküldés',
              }[language]
            }
          </button>
        </form>
      )}
    </>
  );
};

export default RsvpForm;
