import { readFile, readdir, writeFile } from 'fs/promises'

async function getModelList() {
  const modelList = JSON.parse(
    await readFile(
      new URL('../model_list.json', import.meta.url),
    )
  )
  return modelList
}

function modelIdToName(modelList, id) {
  return modelList['models'][id - 1]
}

/* 获取材质名称 */
async function getModelTexturesName(modelName, id) {
  const list = await getModelTexturesList(modelName)
  return list ? list[id - 1] : null
}

/* 获取列表缓存 */
async function getModelTexturesList(modelName) {
  let texturesCache
  try {
    texturesCache = JSON.parse(
      await readFile(
        new URL(`../model/${modelName}/textures.cache`, import.meta.url),
      )
    )
    
  } catch (error) {
    texturesCache = await getTextures(modelName)
    if (texturesCache) {
      await writeFile(
        new URL(`../model/${modelName}/textures.cache`, import.meta.url),
        JSON.stringify(texturesCache)
      )
    }
  }

  return texturesCache ? texturesCache : []
}

/* 获取材质列表 */
async function getTextures(modelName) {
  console.log(import.meta.url)
  try {
    const files = await readdir(new URL(`../model/${modelName}/textures`, import.meta.url))
    return files.map(file => `textures/${file}`)
  } catch (error) {
    console.log(`no dir ../model/${modelName}/textures`)
  }
  return []
}

export { getModelList, modelIdToName, getModelTexturesName, getModelTexturesList }
