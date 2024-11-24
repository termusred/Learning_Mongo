import express from "express"

const Slug = async (req , res , next) =>{
    const { title, content } = req.body; 
    const Slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'); 
    
    const TitleExists = await PostSchema.findOne({title})
    const SlugExists = await PostSchema.findOne({Slug})
    if(TitleExists){
        return res.status(401).send("Title already exist")
    }
    if(SlugExists){
        return res.status(401).send("Slug already exist")
    }
    next()
}