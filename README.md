### Fullstack Sequencer app

So the idea behind this is to create a super simple sequencing app, similar to FL studio but extremely basic (at least at first).

To outline a kind of rough idea of how the frontend (the fun bit) of this will work, we need to understand first the approach we're going to take.

So we want to follow a 'reactive' approach, that is, a centralized store of our sequencer and its state. When updates are made to this centralized store, the DOM/UI will update to show this newly updated state.

There's 3 core layers in this model, a UI layer, a sequence store layer and a controls layer (Play/Pause etc).

Thinking about our sequence store layer, the shape is this:

```
  {
    bpm: number,
    beatsPerBar: number,
    barCount: number,
    rows: [
      {
        id: number,
        name: string,
        steps: boolean[]
      }
    ],
    currentStep: number,
    isPlaying: boolean
  }
```

This is defined within /store/sequence-store.js.

Its responsibilities are:

- Mutate state
- Advance time
- Emit "change" events

It 'owns':

- sequence configuration
- row/step data
- playback timing
- playhead position

It does not:

- Touch the DOM
- Know anything about HTML or CSS
- Care how things are rendered visually

Think of the store as headless. You could swap the whole UI out and as long as it listens to the store, everything should still work.

## Data flow:

Everything in this app follows the same loop:

- User interacts with the UI (clicks a step, presses play, adds a row)
- The UI calls a method on the SequenceStore
- The store mutates its internal state
- The store emits a "change" event
- UI components listening for "change" re-render themselves

At no point does one UI component directly talk to another UI component. Everything talks to the store/state, and from there the UI components update.

## UI Layer

The UI is pieced up into smaller components and they all handle their own things. They don't store anything, they simply reflect what we've got in the state/store.

`SequenceGrid`

- This is like the main component which renders rows for the sequencer. When the store updates, this is where the rows are added/removed/re-rendered.

`GridRow`

- Single track in the sequence, it doesn't care about timing or playback, it just knows this row has steps.

`GridBars`

- Each of the steps are grouped into bars. It is the flat steps array, spliced into chunks based on beatsPerBar.

`GridBar`

- These are just structural for visual grouping, no logic involved.

`GridStep`

- Individual interactive steps which can be toggled on/off. When toggled it's stored as a boolean in the store.

Each UI component:

- Receives the store
- Reads from store.state
- Subscribes to "change" events
- Re-renders when something changes

## Playback & timing (what actually happens when you hit play)

When `play()` is called on the store:

- `isPlaying` is set to true
- A timer (interval) starts
  On every tick:
- currentStep is incremented
- It wraps back to 0 when it reaches the end
- A "change" event is emitted

The UI doesn't anything it just updates when currentStep changes.

This separation is important later when audio gets introduced.
