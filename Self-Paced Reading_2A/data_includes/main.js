PennController.ResetPrefix(null); // Shorten command names (keep this line here))

DebugOff()   // Uncomment this line only when you are 100% done designing your experiment
var showProgressBar = false
// First show instructions, then experiment trials, send results and show end screen
Sequence("form", "instructions_1", randomize("experiment_1"), "instructions_2", randomize("experiment_2"), SendResults(), "end")

// This is run at the beginning of each trial
Header(
    newTimer(250)
        .start()
        .wait()   
)


// Consent form
newTrial("form",
    newHtml("consent_form", "my_file.html")
        .log()
        .cssContainer({"width":"720px"})
        .checkboxWarning("Вы должны заполнить анкету и выразить согласие на участие перед тем, как продолжить.")
        .print()
    ,
    newButton("continue", "Нажмите сюда, если Вы согласны принять участие")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
)

newTrial("instructions_1",
    defaultText.left().print()
    ,
    newText("Инструкция к первой части эксперимента:")
        .css("margin","1em")
    ,
    newText("На этом этапе Вам предстоит читать предложения по частям, нажимая на ПРОБЕЛ, чтобы новая часть появлялась на экране. После некоторых фрагментов, нужно будет ответить на вопросы. ")
        .css("margin","1em")
    ,
    newButton("Начать")
        .center()
        .print()
        .wait()
)

Template( "fragments.csv" , row => newTrial("experiment_1", newController("DashedSentence",{s:row.stimuli, hideUnderscores: true})
        .cssContainer({"width":"70em","padding-left":"0em","margin-left":"-15%"})
        .print()
        .log()
        .wait()
        .remove()
    ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("Оцените насколько хорошо звучит фрагмент по шкале от 1 до 5 (где 1 - очень плохо, 5 - очень хорошо)")
        .css("margin","1em")
        .print()
    ,
    newScale("input_score", "1", "2", "3", "4", "5",)
        .labelsPosition("right")    
        .log()
        .print()
        .wait()
        .remove()
    ,
    newButton("Дальше")
        .print()
        .wait()
    )
)

newTrial("instructions_2",
    defaultText.left().print()
    ,
    newText("Вторая часть эксперимента.")
        .css("margin","1em")
    ,
    newText("На самом деле, в первой части эксперимента половина фрагментов содержала метризованные части. То есть, такие, в которых присутствует регулярное распределение ударений, как в стихах (Например: 'вЫ вчерА спросИли У женЫ')")
        .css("margin","1em")
    ,
    newText("Далее Вам предстоит перечитать фрагменты из первой части и попытаться определить, какие из них метризованные, а какие нет. Мы будем измерять скорость чтения этих фрагментов.")
        .css("margin","1em")
    ,
    newButton("Начать")
        .center()
        .print()
        .wait()
)


Template( "fragments.csv" , 
    row => newTrial("experiment_2", 
    newController("DashedSentence",{s:row.stimuli, hideUnderscores: true})
        .cssContainer({"width":"70em","padding-left":"0em","margin-left":"-15%"})
        .print()
        .log()
        .wait()
        .remove()
    ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("Была ли метризованная часть во фрагменте?")
        .css("margin","1em")
        .print()
    ,
    newScale("q_ismetered", "да", "нет")
        .labelsPosition("right")    
        .log()
        .print()
        .wait()
        .remove()
    ,
    newButton("Дальше")
        .print()
        .wait()
    )
)


// Final screen
newTrial("end",
    newText("На этом всё! Спасибо, что приняли участие в нашем исследовании!")
        .center()
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false)